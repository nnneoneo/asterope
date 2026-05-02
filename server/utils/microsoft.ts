import type { Lead } from './types'

export interface MicrosoftConfig {
  tenantId: string
  clientId: string
  clientSecret: string
  senderUserId: string
  notifyTo: string
  excelDriveId: string
  excelItemId: string
  excelTableName: string
  teamsWebhookUrl: string
}

async function getGraphToken(config: MicrosoftConfig) {
  if (!config.tenantId || !config.clientId || !config.clientSecret) return null

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials'
  })

  const response = await fetch(
    `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    }
  )

  if (!response.ok) throw new Error(`Microsoft token failed: ${response.status}`)
  const payload = await response.json()
  return payload.access_token as string
}

async function graphFetch(config: MicrosoftConfig, path: string, init: RequestInit) {
  const token = await getGraphToken(config)
  if (!token) return { skipped: true }

  const response = await fetch(`https://graph.microsoft.com/v1.0${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {})
    }
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Graph ${path} failed: ${response.status} ${text}`)
  }

  return { skipped: false }
}

export async function runMicrosoftAutomations(lead: Lead, config: MicrosoftConfig) {
  const results = await Promise.allSettled([
    sendOutlookNotification(lead, config),
    syncExcelLead(lead, config),
    notifyTeams(lead, config)
  ])

  return results.map((result) =>
    result.status === 'fulfilled'
      ? result.value
      : { ok: false, error: result.reason instanceof Error ? result.reason.message : 'Unknown error' }
  )
}

async function sendOutlookNotification(lead: Lead, config: MicrosoftConfig) {
  if (!config.senderUserId || !config.notifyTo) return { ok: true, channel: 'outlook', skipped: true }

  await graphFetch(config, `/users/${config.senderUserId}/sendMail`, {
    method: 'POST',
    body: JSON.stringify({
      message: {
        subject: `Nuevo diagnostico estrategico: ${lead.company}`,
        body: {
          contentType: 'HTML',
          content: `
            <h2>Nuevo lead capturado</h2>
            <p><strong>${lead.name}</strong> de ${lead.company}</p>
            <p>${lead.email}</p>
            <p>Industria: ${lead.industry}</p>
            <p>Revenue: ${lead.revenueRange}</p>
            <p>Score: ${lead.score}</p>
            <p>Problema: ${lead.mainProblem}</p>
          `
        },
        toRecipients: [{ emailAddress: { address: config.notifyTo } }]
      },
      saveToSentItems: false
    })
  })

  return { ok: true, channel: 'outlook' }
}

async function syncExcelLead(lead: Lead, config: MicrosoftConfig) {
  if (!config.excelDriveId || !config.excelItemId || !config.excelTableName) {
    return { ok: true, channel: 'excel', skipped: true }
  }

  await graphFetch(
    config,
    `/drives/${config.excelDriveId}/items/${config.excelItemId}/workbook/tables/${config.excelTableName}/rows/add`,
    {
      method: 'POST',
      body: JSON.stringify({
        values: [
          [
            lead.id,
            lead.createdAt,
            lead.name,
            lead.email,
            lead.company,
            lead.industry,
            lead.revenueRange,
            lead.mainProblem,
            lead.status,
            lead.score,
            lead.tags.join(', ')
          ]
        ]
      })
    }
  )

  return { ok: true, channel: 'excel' }
}

async function notifyTeams(lead: Lead, config: MicrosoftConfig) {
  if (!config.teamsWebhookUrl) return { ok: true, channel: 'teams', skipped: true }

  const response = await fetch(config.teamsWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `New Asterope lead: ${lead.company} | ${lead.industry} | score ${lead.score}`
    })
  })

  if (!response.ok) throw new Error(`Teams webhook failed: ${response.status}`)
  return { ok: true, channel: 'teams' }
}
