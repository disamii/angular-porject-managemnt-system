export interface Criterion {
  id: number
  name: string
  publicId?: string
  description: string
  maxScore: number
  scoreType: "DIRECT_SCORE"
  condition: string
  conditionMetScore: number
  conditionNotMetScore: number
  phase: "DOCUMENT_REVIEW" | "PRESENTATION_REVIEW"
  status?: "ACTIVE" | "INACTIVE"
}

export interface Section {
  id?: number
  publicId?: string
  title: string
  description: string
  weight: number
  displayOrder: number
  status?: string
  criteria: Criterion[]
}

export interface EvaluationRubricRequest {
  name: string
  description: string
  documentPassingScore: number
  presentationPassingScore: number
  sections: Section[]
}

export interface EvaluationRubricResponse {
  id: number
  publicId: string
  name: string
  version: string
  description: string
  documentPassingScore: number
  presentationPassingScore: number
  status: string
  sections: Section[]
}

export interface EvaluationRubricUpdateRequest {
  name: string
  description: string
  documentPassingScore: number
  presentationPassingScore: number
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
}

export interface EvaluationRubricUpdateResponse extends EvaluationRubricResponse {}

export interface EvaluationRubricStatusResponse extends EvaluationRubricResponse {}
