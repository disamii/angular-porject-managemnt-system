import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"
import type { AssignmentRequest, AssignmentResponse, AssignmentUpdateRequest } from "../models/assignment.model"

@Injectable({
  providedIn: "root",
})
export class EvaluationAssignmentService {
  private baseUrl = "/api/assignments" // Base URL for the API

  // Centralized mock data
  private mockAssignments: AssignmentResponse[] = [
    {
      id: 1,
      publicId: "assignment-1",
      proposalId: "proposal-1",
      proposalTitle: "Research Grant Proposal",
      evaluatorPublicId: "evaluator-1",
      evaluatorName: "Dr. Jane Smith",
      rubricPublicId: "rubric-1",
      rubricName: "Research Grant Evaluation",
      status: "NOT_STARTED",
      totalScore: 0,
      assignedDate: "2025-04-24T22:18:04.250Z",
      dueDate: "2025-05-15T22:18:04.250Z",
      completedDate: "",
      notes: "Please complete by the due date",
      evaluationType: "DOCUMENT_REVIEW",
      scores: [
        {
          id: 1,
          publicId: "score-1",
          assignmentPublicId: 1,
          criteriaId: 1,
          awardedScore: 0,
          maxScore: 10,
          conditionMet: true,
          comments: "",
          criteriaName: "Research Methodology",
        },
        {
          id: 2,
          publicId: "score-2",
          assignmentPublicId: 1,
          criteriaId: 2,
          awardedScore: 0,
          maxScore: 10,
          conditionMet: true,
          comments: "",
          criteriaName: "Innovation",
        },
      ],
    },
    {
      id: 2,
      publicId: "assignment-2",
      proposalId: "proposal-2",
      proposalTitle: "Technology Innovation Project",
      evaluatorPublicId: "evaluator-2",
      evaluatorName: "Prof. John Davis",
      rubricPublicId: "rubric-2",
      rubricName: "Technology Innovation Evaluation",
      status: "IN_PROGRESS",
      totalScore: 15,
      assignedDate: "2025-04-20T22:19:27.905Z",
      dueDate: "2025-05-10T22:19:27.905Z",
      completedDate: "",
      notes: "Focus on technical feasibility",
      evaluationType: "PRESENTATION_REVIEW",
      scores: [
        {
          id: 3,
          publicId: "score-3",
          assignmentPublicId: 2,
          criteriaId: 3,
          awardedScore: 8,
          maxScore: 10,
          conditionMet: true,
          comments: "Good technical approach",
          criteriaName: "Technical Feasibility",
        },
        {
          id: 4,
          publicId: "score-4",
          assignmentPublicId: 2,
          criteriaId: 4,
          awardedScore: 7,
          maxScore: 10,
          conditionMet: true,
          comments: "Innovative but needs refinement",
          criteriaName: "Innovation Level",
        },
      ],
    },
    {
      id: 3,
      publicId: "assignment-3",
      proposalId: "proposal-3",
      proposalTitle: "Community Development Initiative",
      evaluatorPublicId: "evaluator-3",
      evaluatorName: "Dr. Sarah Johnson",
      rubricPublicId: "rubric-1",
      rubricName: "Research Grant Evaluation",
      status: "COMPLETED",
      totalScore: 42,
      assignedDate: "2025-04-15T10:30:00.000Z",
      dueDate: "2025-05-01T10:30:00.000Z",
      completedDate: "2025-04-28T14:45:00.000Z",
      notes: "Community impact is a key factor",
      evaluationType: "DOCUMENT_REVIEW",
      scores: [
        {
          id: 5,
          publicId: "score-5",
          assignmentPublicId: 3,
          criteriaId: 5,
          awardedScore: 9,
          maxScore: 10,
          conditionMet: true,
          comments: "Excellent community engagement plan",
          criteriaName: "Community Impact",
        },
        {
          id: 6,
          publicId: "score-6",
          assignmentPublicId: 3,
          criteriaId: 6,
          awardedScore: 8,
          maxScore: 10,
          conditionMet: true,
          comments: "Good budget allocation",
          criteriaName: "Budget Appropriateness",
        },
      ],
    },
  ]

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
    assignment: AssignmentUpdateRequest,
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
  updateAssignment(publicId: string, assignment: AssignmentUpdateRequest): Observable<AssignmentResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.put<AssignmentResponse>(
    //   `${this.baseUrl}/${publicId}`,
    //   assignment
    // );

    // Use mock data
    const updatedAssignment = this.mockAssignments.find((a) => a.publicId === publicId)
    if (updatedAssignment) {
      if (assignment.proposalPublicId) updatedAssignment.proposalId = assignment.proposalPublicId
      if (assignment.evaluatorPublicId) updatedAssignment.evaluatorPublicId = assignment.evaluatorPublicId
      if (assignment.rubricPublicId) updatedAssignment.rubricPublicId = assignment.rubricPublicId
      if (assignment.dueDate) updatedAssignment.dueDate = assignment.dueDate.toISOString()
      if (assignment.notes) updatedAssignment.notes = assignment.notes
      // if (assignment.evaluationType) updatedAssignment.evaluationType = assignment.evaluationType
    }
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
    const assignments = this.mockAssignments.filter((a) => a.evaluatorPublicId === evaluatorId)
    return of(assignments).pipe(delay(500)) // Simulate network delay
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
    const assignments = this.mockAssignments.filter((a) => a.proposalId === proposalId)
    return of(assignments).pipe(delay(500)) // Simulate network delay
  }

  /**
   * Create a new evaluation assignment
   * @param assignment The assignment data
   * @returns Observable of AssignmentResponse
   */
  createAssignment(assignment: AssignmentRequest): Observable<AssignmentResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.post<AssignmentResponse>(this.baseUrl, assignment);

    // Use mock data
    const newId = this.mockAssignments.length + 1
    const newPublicId = `assignment-${newId}`

    // Find proposal title based on ID (in a real app, this would come from the backend)
    const proposalTitles: { [key: string]: string } = {
      "proposal-1": "Research Grant Proposal",
      "proposal-2": "Technology Innovation Project",
      "proposal-3": "Community Development Initiative",
      "proposal-4": "Educational Program Expansion",
      "proposal-5": "Healthcare Improvement Proposal",
    }

    // Find evaluator name based on ID (in a real app, this would come from the backend)
    const evaluatorNames: { [key: string]: string } = {
      "evaluator-1": "Dr. Jane Smith",
      "evaluator-2": "Prof. John Davis",
      "evaluator-3": "Dr. Sarah Johnson",
      "evaluator-4": "Dr. Michael Brown",
      "evaluator-5": "Prof. Emily Wilson",
    }

    // Find rubric name based on ID (in a real app, this would come from the backend)
    const rubricNames: { [key: string]: string } = {
      "rubric-1": "Research Grant Evaluation",
      "rubric-2": "Technology Innovation Evaluation",
      "rubric-3": "Community Impact Assessment",
      "rubric-4": "Educational Program Evaluation",
      "rubric-5": "Healthcare Initiative Assessment",
    }

    const newAssignment: AssignmentResponse = {
      id: newId,
      publicId: newPublicId,
      proposalId: assignment.proposalPublicId,
      proposalTitle: proposalTitles[assignment.proposalPublicId] || "Unknown Proposal",
      evaluatorPublicId: assignment.evaluatorPublicId,
      evaluatorName: evaluatorNames[assignment.evaluatorPublicId] || "Unknown Evaluator",
      rubricPublicId: assignment.rubricPublicId,
      rubricName: rubricNames[assignment.rubricPublicId] || "Unknown Rubric",
      status: "NOT_STARTED",
      totalScore: 0,
      assignedDate: new Date().toISOString(),
      dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString() : undefined,
      completedDate: "",
      notes: assignment.notes || "",
      // evaluationType: assignment.evaluationType || "DOCUMENT_REVIEW",
      scores: [],
    }

    this.mockAssignments.push(newAssignment)
    return of(newAssignment).pipe(delay(800)) // Simulate network delay
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
    const uniqueEvaluators = new Set(this.mockAssignments.map((a) => a.evaluatorPublicId)).size

    // Count unique proposals
    const uniqueProposals = new Set(this.mockAssignments.map((a) => a.proposalId)).size

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
