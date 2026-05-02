import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Lead, LeadInput, LeadStatus } from './types'
import { buildLeadTags, scoreLead } from './scoring'

const dataDir = join(process.cwd(), 'data')
const dataFile = join(dataDir, 'leads.json')

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await readFile(dataFile, 'utf8')
    return JSON.parse(raw) as Lead[]
  } catch {
    return []
  }
}

async function writeLeads(leads: Lead[]) {
  await mkdir(dataDir, { recursive: true })
  await writeFile(dataFile, JSON.stringify(leads, null, 2))
}

export async function listLeads() {
  const leads = await readLeads()
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getLead(id: string) {
  const leads = await readLeads()
  return leads.find((lead) => lead.id === id) || null
}

export async function createLead(input: LeadInput) {
  const now = new Date().toISOString()
  const tags = buildLeadTags(input)
  const score = scoreLead(input, tags)
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    status: score >= 70 ? 'Qualified' : 'New',
    score,
    tags,
    notes: [],
    activity: [`${now} - Lead captured and scored ${score}`],
    createdAt: now,
    updatedAt: now
  }
  const leads = await readLeads()
  leads.unshift(lead)
  await writeLeads(leads)
  return lead
}

export async function updateLead(
  id: string,
  patch: { status?: LeadStatus; note?: string }
) {
  const leads = await readLeads()
  const index = leads.findIndex((lead) => lead.id === id)
  if (index === -1) return null

  const now = new Date().toISOString()
  const lead = leads[index]
  if (patch.status && patch.status !== lead.status) {
    lead.status = patch.status
    lead.activity.unshift(`${now} - Status changed to ${patch.status}`)
  }
  if (patch.note?.trim()) {
    lead.notes.unshift(`${now} - ${patch.note.trim()}`)
    lead.activity.unshift(`${now} - Note added`)
  }
  lead.updatedAt = now
  leads[index] = lead
  await writeLeads(leads)
  return lead
}

export function summarizeLeads(leads: Lead[]) {
  const total = leads.length
  const qualified = leads.filter((lead) => lead.status !== 'New').length
  const closed = leads.filter((lead) => lead.status === 'Closed').length

  return {
    total,
    qualified,
    closed,
    conversionRate: total ? Math.round((closed / total) * 100) : 0,
    averageScore: total
      ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / total)
      : 0
  }
}
