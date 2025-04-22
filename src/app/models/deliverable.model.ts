export interface Milestone {
    id: number;
    name: string;
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  }
  
  export interface Deliverable {
    id: number;
    name: string;
    description: string;
    milestone: Milestone;
    reviewed: boolean;
  }
  