export interface EvaluatorRequest {
    userId: number;
    expertise: string;
    maxAssignments: number;
    type: 'DOCUMENT_REVIEWER' | 'PRESENTATION_REVIEWER'; // Assuming these are the possible values
  }
  
  export interface EvaluatorResponse {
    id: number;
    publicId: string;
    userId: number;
    expertise: string;
    maxAssignments: number;
    type: 'DOCUMENT_REVIEWER' | 'PRESENTATION_REVIEWER'; // Assuming these are the possible values
    evaluatorName: string;
  }
  
  export interface EvaluatorUpdateRequest {
    expertise: string;
    maxAssignments: number;
    type: 'DOCUMENT_REVIEWER' | 'PRESENTATION_REVIEWER'; // Assuming these are the possible values
  }
  