export interface Milestone {
    id: number;
    name: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  }
  
  export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export interface Task {
    id: number;
    name: string;
    description: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'; 
    milestone: Milestone;
    assignedTo: Person;
  }
  