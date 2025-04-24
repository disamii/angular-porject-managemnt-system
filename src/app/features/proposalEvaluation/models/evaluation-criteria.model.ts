export interface EvaluationCriteriaRequest {
    name: string;
    description: string;
    maxScore: number;
    scoreType: 'DIRECT_SCORE'; // Assuming this is a fixed string or enum
    condition: string;
    conditionMetScore: number;
    conditionNotMetScore: number;
    phase: 'DOCUMENT_REVIEW' | 'PRESENTATION_REVIEW'; // Assuming these are the possible values
    status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'; // Assuming these are the possible values
  }
  
  export interface EvaluationCriteriaResponse {
    id: number;
    publicId: string;
    name: string;
    description: string;
    maxScore: number;
    scoreType: 'DIRECT_SCORE'; // Assuming this is a fixed string or enum
    condition: string;
    conditionMetScore: number;
    conditionNotMetScore: number;
    phase: 'DOCUMENT_REVIEW' | 'PRESENTATION_REVIEW'; // Assuming these are the possible values
    status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'; // Assuming these are the possible values
  }
  