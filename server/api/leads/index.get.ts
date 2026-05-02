import { getQuery } from 'h3'
import { listLeads, summarizeLeads } from '../../utils/leadStore'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const query = getQuery(event)
  const search = String(query.search || '').toLowerCase()
  const status = String(query.status || '')
  const allLeads = await listLeads()
  const leads = allLeads.filter((lead) => {
    const matchesSearch =
      !search ||
      [lead.name, lead.email, lead.company, lead.industry, lead.mainProblem, lead.tags.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(search)
    const matchesStatus = !status || lead.status === status
    return matchesSearch && matchesStatus
  })

  return { leads, summary: summarizeLeads(allLeads) }
})
