export interface Project {
  id: number;
  title: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  requestedBudget: number;
  allowedBudget: number;
  principalInvestigator: Person;
  researchAdvisor: Person;
  members: Person[];
  milestones: Milestone[];
  researchProposal: ResearchProposal;
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Milestone {
  id: number;
  name: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'; // You can add more statuses if applicable
  budget: number;
  researchProject: {
    id: number;
    title: string;
  };
  tasks: Task[];
  deliverables: Deliverable[];
}

export interface Task {
  id: number;
  name: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'; // Again, customize as needed
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

export interface ResearchProposal {
  id: number;
  title: string;
}
export interface CreateProjectDto {
  title: string;
  description: string;
  startDate: string; 
  endDate: string;
  requestedBudget: number;
  allowedBudget: number;
  principalInvestigatorId: number;
  researchAdvisorId: number;
  memberIds: number[];
  researchProposalId: number;
}
