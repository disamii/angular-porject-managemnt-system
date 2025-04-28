// export interface Score {
//   id: number
//   publicId: string
//   assignmentPublicId: number
//   criteriaId: number
//   awardedScore: number
//   maxScore: number
//   conditionMet: boolean
//   comments: string
//   criteriaName: string
// }

export interface Score {
  criterionId: number;
  criterionName: string;
  maxScore: number;
  awardedScore: number;
  comments: string;
  conditionDescription?: string;
  // conditionMet?: boolean;
}


// export interface AssignmentRequest {
//   proposalPublicId: string
//   evaluatorPublicId: string
//   rubricPublicId: string
//   dueDate?: Date
//   notes?: string
// }

export interface AssignmentResponse {
  id: number
  publicId: string
  evaluator:User,
  proposal: Proposal;
  rubric: Rubric;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
  totalScore: number
  assignedDate: string
  dueDate?: string
  completedDate: string
  notes?: string
  evaluationType?: string
  scores: Score[]
}

export interface AssignmentRequest {
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
  feedback?: string
  proposalPublicId?: string
  evaluatorPublicId?: string
  rubricPublicId?: string
  dueDate?: Date
  notes?: string
}


export interface User {
  id: number;
  publicId: string;
  fullName: string;
  email: string;
  role: "EVALUATOR" | "ADMIN" | "STUDENT"; // You can adjust if there are more roles
  expertise: string;
}

export interface Proposal {
  id: number;
  publicId: string;
  title: string;
  principalInvestigator: string;
  organization: string;
}

export interface Rubric {
  id: number;
  name: string;
  version: string;
  documentPassingScore: number;
  presentationPassingScore: number;
}



export interface Assignment {
  assignmentId: number;
  publicId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  assignedDate: string; // ISO date string
  completedDate: string | null; 
  proposal: Proposal;
  rubric: Rubric;
  scores: Score[];
}

export interface EvaluatorAssignmentResponse {
  user: User;
  assignments: Assignment[];
}
