export interface ScoreRequest {
    criteriaId: number;
    awardedScore: number;
    conditionMet: boolean;
    comments: string;
  }
  
  export interface ScoreResponse {
    id: number;
    publicId: string;
    assignmentPublicId: number;
    criteriaId: number;
    awardedScore: number;
    maxScore: number;
    conditionMet: boolean;
    comments: string;
    criteriaName: string;
  }
  
  export interface ScoreUpdateRequest {
    awardedScore: number;
    conditionMet: boolean;
    comments: string;
  }
  