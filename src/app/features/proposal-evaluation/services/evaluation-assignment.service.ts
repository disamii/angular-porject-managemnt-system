import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"
import type { AssignmentRequest, AssignmentResponse, } from "../models/assignment.model"

@Injectable({
  providedIn: "root",
})
export class EvaluationAssignmentService {
  private baseUrl = "/api/assignments" // Base URL for the API

  // Centralized mock data
 
private mockAssignments: AssignmentResponse[] = [
  {
    id: 1,
    publicId: "ASSGN-2024-001",
    evaluator: {
      id: 5,
      publicId: "USR-8392",
      fullName: "Dr. Samson Mamuye",
      email: "samson@example.com",
      role: "EVALUATOR",
      expertise: "AI, Biomedical Engineering"
    },
    proposal: {
      id: 30,
      publicId: "PROP-ABC-2024",
      title: "Smart Healthcare System using AI",
      principalInvestigator: "Prof. Helen Getachew",
      organization: "Bahir Dar University"
    },
    rubric: {
      id: 7,
      name: "NSF 2024 Research Evaluation Rubric",
      version: "1.0",
      documentPassingScore: 50,
      presentationPassingScore: 50
    },
    status: "IN_PROGRESS",
    totalScore: 15,
    assignedDate: "2025-04-25T10:00:00Z",
    completedDate: "",
    notes: "Initial review completed, awaiting detailed analysis.",
    scores: [
      {
        criterionId: 101,
        criterionName: "Feasibility",
        maxScore: 15,
        awardedScore: 13,
        comments: "Very realistic plan, minor risks."
      },
      {
        criterionId: 102,
        criterionName: "Timeline Realism",
        maxScore: 10,
        awardedScore: 8,
        comments: "Timeline achievable with minor adjustments.",
        conditionDescription: "Timeline is feasible if resources are available."
      }
    ]
  },
  {
    id: 2,
    publicId: "ASSGN-2024-002",
    evaluator: {
      id: 6,
      publicId: "USR-8393",
      fullName: "Prof. Selam Tadesse",
      email: "selam@example.com",
      role: "EVALUATOR",
      expertise: "Renewable Energy, Power Systems"
    },
    proposal: {
      id: 32,
      publicId: "PROP-XYZ-2024",
      title: "Solar Microgrid Deployment",
      principalInvestigator: "Dr. Markos Bekele",
      organization: "Addis Ababa University"
    },
    rubric: {
      id: 8,
      name: "Energy Research Rubric 2024",
      version: "2.0",
      documentPassingScore: 55,
      presentationPassingScore: 60
    },
    status: "NOT_STARTED",
    totalScore: 0,
    assignedDate: "2025-04-26T12:00:00Z",
    completedDate: "",
    notes: "",
    scores: []
  },
  {
    id: 3,
    publicId: "ASSGN-2024-003",
    evaluator: {
      id: 7,
      publicId: "USR-8394",
      fullName: "Dr. Alex Wondimu",
      email: "alex@example.com",
      role: "EVALUATOR",
      expertise: "Data Science, Machine Learning"
    },
    proposal: {
      id: 33,
      publicId: "PROP-DEF-2024",
      title: "AI-driven Environmental Monitoring System",
      principalInvestigator: "Dr. Solomon Abebe",
      organization: "Jimma University"
    },
    rubric: {
      id: 9,
      name: "AI Research Rubric 2024",
      version: "1.2",
      documentPassingScore: 60,
      presentationPassingScore: 65
    },
    status: "COMPLETED",
    totalScore: 85,
    assignedDate: "2025-04-27T09:00:00Z",
    completedDate: "2025-04-28T10:00:00Z",
    notes: "Evaluation completed successfully, highly innovative.",
    scores: [
      {
        criterionId: 103,
        criterionName: "Innovation",
        maxScore: 30,
        awardedScore: 28,
        comments: "The proposed system shows high potential for environmental impact."
      },
      {
        criterionId: 104,
        criterionName: "Scalability",
        maxScore: 20,
        awardedScore: 18,
        comments: "Can be scaled with minimal modifications."
      },
      {
        criterionId: 105,
        criterionName: "Technical Feasibility",
        maxScore: 20,
        awardedScore: 19,
        comments: "Technically sound, though challenges with hardware integration may arise."
      },
      {
        criterionId: 106,
        criterionName: "Sustainability",
        maxScore: 15,
        awardedScore: 15,
        comments: "Sustainability features well integrated into the proposal."
      },
      {
        criterionId: 107,
        criterionName: "Presentation Quality",
        maxScore: 15,
        awardedScore: 14,
        comments: "Presentation was clear, but could use more detailed diagrams."
      }
    ]
  }
];


  // constructor(private http: HttpClient) {}

  /**
   * Get assignment details by public ID
   * @param publicId The public ID of the assignment
   * @returns Observable of AssignmentResponse
   */
  getAssignment(publicId: string): Observable<AssignmentResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<AssignmentResponse>(`${this.baseUrl}/${publicId}`);

    // Use mock data
    const assignment = this.mockAssignments.find((a) => a.publicId === publicId)
    return of(assignment).pipe(delay(300)) // Simulate network delay
  }

  /**
   * Update an assignment status by public ID
   * @param publicId The public ID of the assignment
   * @param assignment The updated assignment data
   * @returns Observable of AssignmentResponse
   */
  updateAssignmentStatus(
    publicId: string,
    assignment: AssignmentRequest,
  ): Observable<AssignmentResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.put<AssignmentResponse>(
    //   `${this.baseUrl}/${publicId}/status`,
    //   assignment
    // );

    // Use mock data
    const updatedAssignment = this.mockAssignments.find((a) => a.publicId === publicId)
    if (updatedAssignment) {
      if (assignment.status) updatedAssignment.status = assignment.status
      if (assignment.feedback) updatedAssignment.notes = assignment.feedback

      // If status is COMPLETED, set completedDate
      if (assignment.status === "COMPLETED" && !updatedAssignment.completedDate) {
        updatedAssignment.completedDate = new Date().toISOString()
      }
    }
    return of(updatedAssignment).pipe(delay(500)) // Simulate network delay
  }

  /**
   * Update an assignment by public ID
   * @param publicId The public ID of the assignment
   * @param assignment The updated assignment data
   * @returns Observable of AssignmentResponse
   */
  updateAssignment(publicId: string, assignment: AssignmentRequest): Observable<AssignmentResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.put<AssignmentResponse>(
    //   `${this.baseUrl}/${publicId}`,
    //   assignment
    // );

    // Use mock data
    const updatedAssignment = this.mockAssignments.find((a) => a.publicId === publicId)
    // if (updatedAssignment) {
    //   if (assignment.proposalPublicId) updatedAssignment.proposalId = assignment.proposalPublicId
    //   if (assignment.evaluatorPublicId) updatedAssignment.evaluatorPublicId = assignment.evaluatorPublicId
    //   if (assignment.rubricPublicId) updatedAssignment.rubricPublicId = assignment.rubricPublicId
    //   if (assignment.dueDate) updatedAssignment.dueDate = assignment.dueDate.toISOString()
    //   if (assignment.notes) updatedAssignment.notes = assignment.notes
    //   // if (assignment.evaluationType) updatedAssignment.evaluationType = assignment.evaluationType
    // }
    return of(updatedAssignment).pipe(delay(700)) // Simulate network delay
  }

  /**
   * Delete an assignment by public ID
   * @param publicId The public ID of the assignment
   * @returns Observable of any
   */
  deleteAssignment(publicId: string): Observable<any> {
    // Uncomment the line below when the backend is ready
    // return this.http.delete(`${this.baseUrl}/${publicId}`);

    // Use mock data
    this.mockAssignments = this.mockAssignments.filter((a) => a.publicId !== publicId)
    return of({ success: true }).pipe(delay(500)) // Simulate network delay
  }

  /**
   * Get all assignments
   * @returns Observable of AssignmentResponse[]
   */
  getAllAssignments(): Observable<AssignmentResponse[]> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<AssignmentResponse[]>(this.baseUrl);

    // Use mock data
    return of(this.mockAssignments).pipe(delay(500)) // Simulate network delay
  }

  /**
   * Get assignments by evaluator
   * @param evaluatorId The evaluator ID
   * @returns Observable of AssignmentResponse[]
   */
  getAssignmentsByEvaluator(evaluatorId: string): Observable<AssignmentResponse[]> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<AssignmentResponse[]>(`${this.baseUrl}/evaluator/${evaluatorId}`);

    // Use mock data
    const assignments = this.mockAssignments.filter(
      (a) => a.evaluator.publicId === evaluatorId
    );    return of(assignments).pipe(delay(500)) // Simulate network delay
  }

  /**
   * Get assignments by proposal
   * @param proposalId The proposal ID
   * @returns Observable of AssignmentResponse[]
   */
  getAssignmentsByProposal(proposalId: string): Observable<AssignmentResponse[]> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<AssignmentResponse[]>(`${this.baseUrl}/proposal/${proposalId}`);

    // Use mock data
    const assignments = this.mockAssignments.filter(
      (a) => a.proposal.publicId === proposalId
    );    return of(assignments).pipe(delay(500)) // Simulate network delay
  }

  /**
   * Create a new evaluation assignment
   * @param assignment The assignment data
   * @returns Observable of AssignmentResponse
   */
  createAssignment(assignment: AssignmentRequest): Observable<AssignmentResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.post<AssignmentResponse>(this.baseUrl, assignment);
    return of(this.mockAssignments[0]).pipe(delay(800)) 
  }

  /**
   * Get assignment statistics
   * @returns Observable of assignment statistics
   */
  getAssignmentStatistics(): Observable<any> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<any>(`${this.baseUrl}/statistics`);

    // Use mock data
    const totalAssignments = this.mockAssignments.length
    const completedAssignments = this.mockAssignments.filter((a) => a.status === "COMPLETED").length
    const inProgressAssignments = this.mockAssignments.filter((a) => a.status === "IN_PROGRESS").length
    const notStartedAssignments = this.mockAssignments.filter((a) => a.status === "NOT_STARTED").length

    const completionRate = totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0

    // Count unique evaluators
    const uniqueEvaluators = new Set(this.mockAssignments.map((a) => a.evaluator.id)).size

    // Count unique proposals
    const uniqueProposals = new Set(this.mockAssignments.map((a) => a.proposal.id)).size

    // Calculate average score for completed assignments
    const completedScores = this.mockAssignments.filter((a) => a.status === "COMPLETED").map((a) => a.totalScore)

    const averageScore =
      completedScores.length > 0 ? completedScores.reduce((sum, score) => sum + score, 0) / completedScores.length : 0

    return of({
      totalAssignments,
      completedAssignments,
      inProgressAssignments,
      notStartedAssignments,
      completionRate,
      uniqueEvaluators,
      uniqueProposals,
      averageScore,
    }).pipe(delay(700)) // Simulate network delay
  }
}
