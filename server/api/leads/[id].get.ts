import { createError } from 'h3'
import { getLead } from '../../utils/leadStore'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const lead = await getLead(String(event.context.params?.id))
  if (!lead) throw createError({ statusCode: 404, statusMessage: 'Lead not found' })
  return { lead }
})
