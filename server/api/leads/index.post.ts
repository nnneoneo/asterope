import { createError, readBody } from 'h3'
import { createLead } from '../../utils/leadStore'
import { runMicrosoftAutomations } from '../../utils/microsoft'
import type { MicrosoftConfig } from '../../utils/microsoft'
import type { LeadInput } from '../../utils/types'

function cleanString(value: unknown) {
  return String(value || '').trim()
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<LeadInput>>(event)
  const input: LeadInput = {
    name: cleanString(body.name),
    email: cleanString(body.email),
    company: cleanString(body.company),
    industry: cleanString(body.industry),
    revenueRange: cleanString(body.revenueRange),
    mainProblem: cleanString(body.mainProblem)
  }

  const missing = Object.entries(input).filter(([, value]) => !value)
  if (missing.length) {
    throw createError({
      statusCode: 422,
      statusMessage: `Missing fields: ${missing.map(([key]) => key).join(', ')}`
    })
  }

  const lead = await createLead(input)
  const config = useRuntimeConfig()
  const automations = await runMicrosoftAutomations(
    lead,
    config.microsoft as unknown as MicrosoftConfig
  )

  return { lead, automations }
})
