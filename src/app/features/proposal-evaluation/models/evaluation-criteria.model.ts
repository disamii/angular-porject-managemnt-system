export interface EvaluationCriteriaRequest {
  name: string
  description: string
  maxScore: number
  scoreType: "DIRECT_SCORE"
  condition: string
  conditionMetScore: number
  conditionNotMetScore: number
  phase: "DOCUMENT_REVIEW" | "PRESENTATION_REVIEW"
  status: "ACTIVE" | "INACTIVE" | "DRAFT"
}

export interface EvaluationCriteriaResponse {
  id: number
  publicId: string
  name: string
  description: string
  maxScore: number
  scoreType: "DIRECT_SCORE"
  condition: string
  conditionMetScore: number
  conditionNotMetScore: number
  phase: "DOCUMENT_REVIEW" | "PRESENTATION_REVIEW"
  status: "ACTIVE" | "INACTIVE" | "DRAFT"
}
