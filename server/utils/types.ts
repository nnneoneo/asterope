export type LeadStatus = 'New' | 'Qualified' | 'Contacted' | 'Closed'

export interface LeadInput {
  name: string
  email: string
  company: string
  industry: string
  revenueRange: string
  mainProblem: string
}

export interface Lead extends LeadInput {
  id: string
  status: LeadStatus
  score: number
  tags: string[]
  notes: string[]
  activity: string[]
  createdAt: string
  updatedAt: string
}
