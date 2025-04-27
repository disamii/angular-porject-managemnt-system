export interface Score {
  id: number
  publicId: string
  assignmentPublicId: number
  criteriaId: number
  awardedScore: number
  maxScore: number
  conditionMet: boolean
  comments: string
  criteriaName: string
  strengths?: string
  weaknesses?: string
}

export interface AssignmentRequest {
  proposalPublicId: string
  evaluatorPublicId: string
  rubricPublicId: string
  dueDate?: Date
  notes?: string
}

export interface AssignmentResponse {
  id: number
  publicId: string
  proposalId?: string
  proposalTitle: string
  evaluatorPublicId?: string
  evaluatorName: string
  rubricPublicId?: string
  rubricName: string
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
  totalScore: number
  assignedDate: string
  dueDate?: string
  completedDate: string
  notes?: string
  evaluationType?: string
  scores: Score[]
}

export interface AssignmentUpdateRequest {
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
  feedback?: string
  proposalPublicId?: string
  evaluatorPublicId?: string
  rubricPublicId?: string
  dueDate?: Date
  notes?: string
}
