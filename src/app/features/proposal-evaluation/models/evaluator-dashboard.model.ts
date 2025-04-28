export interface User {
    id: number
    publicId: string
    fullName: string
    email: string
    role: string
    expertise: string
  }
  
  export interface Proposal {
    id: number
    publicId: string
    title: string
    principalInvestigator: string
    organization: string
    documentUrl?: string // URL to the PDF document
  }
  
  export interface Rubric {
    id: number
    name: string
    version: string
    documentPassingScore: number
    presentationPassingScore: number
  }
  
  export interface Score {
    criterionId: number
    criterionName: string
    maxScore: number
    scoreType: "DIRECT_SCORE" | "CONDITIONAL_SCORE"
    awardedScore: number
    conditionDescription?: string
    conditionMet?: boolean
    comments: string
  }
  
  export interface Assignment {
    assignmentId: number
    publicId: string
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
    assignedDate: string
    completedDate: string | null
    dueDate?: string
    proposal: Proposal
    rubric: Rubric
    scores: Score[]
  }
  
  export interface EvaluatorDashboard {
    user: User
    assignments: Assignment[]
  }
  
  export interface ScoreSubmission {
    criterionId: number
    awardedScore: number
    conditionMet?: boolean
    comments: string
  }
  
  export interface AssignmentSubmission {
    assignmentId: number
    scores: ScoreSubmission[]
  }
  