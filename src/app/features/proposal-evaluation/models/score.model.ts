export interface ScoreRequest {
  assignmentPublicId: number
  criteriaId: number
  awardedScore: number
  conditionMet: boolean
  comments: string
}
// In score.model.ts
export interface ScoreSummary {
  totalScore: number
  maxPossibleScore: number
  percentageScore: number
  sectionsCompleted: number
  totalSections: number
  criteriaScored: number
  totalCriteria: number
  completionPercentage: number
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
}

export interface ScoreResponse {
  id: number
  publicId: string
  assignmentPublicId: number
  criteriaId: number
  awardedScore: number
  maxScore: number
  conditionMet: boolean
  comments: string
  criteriaName: string
}

export interface ScoreUpdateRequest {
  awardedScore: number
  conditionMet: boolean
  comments: string
}
