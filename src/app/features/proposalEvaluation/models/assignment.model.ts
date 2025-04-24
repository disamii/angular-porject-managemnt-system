export interface Score {
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
  
  export interface AssignmentRequest {
    proposalPublicId: string;
    evaluatorPublicId: string;
    rubricPublicId: string;
  }
  
  export interface AssignmentResponse {
    id: number;
    publicId: string;
    proposalTitle: string;
    evaluatorName: string;
    rubricName: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'; // Assuming these are the possible values
    totalScore: number;
    assignedDate: string; // ISO date string
    completedDate: string; // ISO date string
    scores: Score[];
  }
  
  export interface AssignmentUpdateRequest {
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'; // Assuming these are the possible values
    feedback: string;
  }
  