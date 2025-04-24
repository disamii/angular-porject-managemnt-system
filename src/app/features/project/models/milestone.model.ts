export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ResearchProject {
  id: number;
  title: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  milestone: {
    id: number;
    name: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  };
  assignedTo: Person;
}

export interface Deliverable {
  id: number;
  name: string;
  description: string;
  milestone: {
    id: number;
    name: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  };
  reviewed: boolean;
}

export interface Milestone {
  id: number;
  name: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  budget: number;
  researchProject: ResearchProject;
  tasks: Task[];
  deliverables: Deliverable[];
}
