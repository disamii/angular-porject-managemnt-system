export interface CriterionRequest {
  name: string
  description: string
  maxScore: number
  scoreType: "DIRECT_SCORE"
  condition: string
  conditionMetScore: number
  conditionNotMetScore: number
  phase: "DOCUMENT_REVIEW" | "PRESENTATION_REVIEW"
}

export interface CriterionResponse {
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
  status: "ACTIVE" | "INACTIVE"
}

export interface RubricSectionRequest {
  title: string
  description: string
  weight: number
  displayOrder: number
  criteria: CriterionRequest[]
}

export interface RubricSectionResponse {
  id: number
  publicId: string
  title: string
  description: string
  weight: number
  displayOrder: number
  status: string
  criteria: CriterionResponse[]
}

export interface RubricSectionUpdateRequest {
  title: string
  description: string
  weight: number
  displayOrder: number
  status: "ACTIVE" | "INACTIVE" | "DRAFT"
}
