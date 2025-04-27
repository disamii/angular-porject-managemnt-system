export interface EvaluatorBase {
  name: string
  email: string
  organization: string
  type: "INTERNAL" | "EXTERNAL" | "SUBJECT_MATTER_EXPERT"
  expertise: string[]
  isActive: boolean
}

export interface EvaluatorRequest extends EvaluatorBase {
  id?: number
}

export interface EvaluatorResponse extends EvaluatorBase {
  id: number
  publicId: string
  createdAt: Date
  updatedAt: Date
  assignmentCount: number
  completedAssignmentCount: number
}

export interface EvaluatorDetailResponse extends EvaluatorResponse {
  averageScore: number
  averageCompletionTime: number // in days
  onTimePercentage: number
  recentAssignments: {
    id: string
    proposalTitle: string
    status: string
    dueDate: Date
    assignedDate: Date
    completedDate?: Date
  }[]
  expertiseAreas: {
    name: string
    count: number
  }[]
}

export interface EvaluatorStats {
  totalAssignments: number
  completedAssignments: number
  pendingAssignments: number
  averageScore: number
  averageCompletionTime: number // in days
  onTimePercentage: number
}
