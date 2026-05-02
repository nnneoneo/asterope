import { createError, readBody } from 'h3'
import { updateLead } from '../../utils/leadStore'
import { requireAdmin } from '../../utils/auth'
import type { LeadStatus } from '../../utils/types'

const allowedStatuses: LeadStatus[] = ['New', 'Qualified', 'Contacted', 'Closed']

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const body = await readBody<{ status?: LeadStatus; note?: string }>(event)
  if (body.status && !allowedStatuses.includes(body.status)) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid lead status' })
  }

  const lead = await updateLead(String(event.context.params?.id), {
    status: body.status,
    note: body.note
  })
  if (!lead) throw createError({ statusCode: 404, statusMessage: 'Lead not found' })
  return { lead }
})
