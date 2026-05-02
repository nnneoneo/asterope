import type { LeadInput } from './types'

const regulatedIndustries = ['salud', 'health', 'pharma', 'farmacia', 'finanzas', 'legal', 'seguros']
const urgentProblems = ['auditoria', 'compliance', 'operaciones', 'sistemas', 'revenue', 'ingresos', 'procesos']

export function normalize(value: string) {
  return value.trim().toLowerCase()
}

export function buildLeadTags(input: LeadInput) {
  const industry = normalize(input.industry)
  const problem = normalize(input.mainProblem)
  const tags = new Set<string>()

  if (regulatedIndustries.some((term) => industry.includes(term))) tags.add('regulated')
  if (industry.includes('salud') || industry.includes('health') || industry.includes('farmacia')) tags.add('healthcare')
  if (industry.includes('finanzas') || industry.includes('bank') || industry.includes('seguros')) tags.add('financial-services')
  if (problem.includes('auditoria') || problem.includes('compliance')) tags.add('audit-readiness')
  if (problem.includes('sistema') || problem.includes('proceso') || problem.includes('operacion')) tags.add('operating-system')
  if (problem.includes('crecimiento') || problem.includes('escala') || problem.includes('ventas')) tags.add('growth')

  tags.add(`revenue:${input.revenueRange}`)
  return [...tags]
}

export function scoreLead(input: LeadInput, tags = buildLeadTags(input)) {
  let score = 35
  const revenue = normalize(input.revenueRange)
  const problem = normalize(input.mainProblem)

  if (revenue.includes('1m') || revenue.includes('5m')) score += 18
  if (revenue.includes('10m') || revenue.includes('25m') || revenue.includes('50m')) score += 28
  if (tags.includes('regulated')) score += 16
  if (urgentProblems.some((term) => problem.includes(term))) score += 14
  if (problem.length > 90) score += 7
  if (input.company.trim().length > 2) score += 5

  return Math.min(score, 100)
}
