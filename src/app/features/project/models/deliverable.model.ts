export interface Milestone {
    id: number;
    name: string;
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  }
  
  export interface DeliverableRequest {
    id: number;
    name: string;
    description: string;
    milestoneId: number;
    reviewed: boolean;
  }
  
  export interface DeliverableResponse {
    id: number;
    publicId: string;
    name: string;
    description: string;
    reviewStatus: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED'; 
    reviewComments: string;
    dueDate: string; 
    submissionDate: string; 
    reviewed: boolean;
    milestone: Milestone;
  }
  
