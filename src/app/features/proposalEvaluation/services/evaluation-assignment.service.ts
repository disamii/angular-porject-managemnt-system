import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AssignmentRequest, AssignmentResponse, AssignmentUpdateRequest } from '../models/assignment.model';

@Injectable({
  providedIn: 'root',
})
export class EvaluationAssignmentService {
  private baseUrl = '/api/assignments'; // Base URL for the API

  // Centralized mock data
  private mockAssignments: AssignmentResponse[] = [
    {
      id: 1,
      publicId: 'assignment-1',
      proposalTitle: 'Proposal 1',
      evaluatorName: 'Evaluator 1',
      rubricName: 'Rubric 1',
      status: 'NOT_STARTED',
      totalScore: 0,
      assignedDate: '2025-04-24T22:18:04.250Z',
      completedDate: '2025-04-24T22:18:04.250Z',
      scores: [
        {
          id: 1,
          publicId: 'score-1',
          assignmentPublicId: 1,
          criteriaId: 1,
          awardedScore: 0,
          maxScore: 10,
          conditionMet: true,
          comments: 'Good work!',
          criteriaName: 'Criterion 1',
        },
      ],
    },
    {
      id: 2,
      publicId: 'assignment-2',
      proposalTitle: 'Proposal 2',
      evaluatorName: 'Evaluator 2',
      rubricName: 'Rubric 2',
      status: 'IN_PROGRESS',
      totalScore: 5,
      assignedDate: '2025-04-24T22:19:27.905Z',
      completedDate: '2025-04-24T22:19:27.905Z',
      scores: [
        {
          id: 2,
          publicId: 'score-2',
          assignmentPublicId: 2,
          criteriaId: 2,
          awardedScore: 5,
          maxScore: 8,
          conditionMet: false,
          comments: 'Needs improvement.',
          criteriaName: 'Criterion 2',
        },
      ],
    },
  ];

  constructor(private http: HttpClient) {}

  /**
   * Get assignment details by public ID
   * @param publicId The public ID of the assignment
   * @returns Observable of AssignmentResponse
   */
  getAssignment(publicId: string): Observable<AssignmentResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<AssignmentResponse>(`${this.baseUrl}/${publicId}`);

    // Use mock data
    const assignment = this.mockAssignments.find((a) => a.publicId === publicId);
    return of(assignment);
  }

  /**
   * Update an assignment status by public ID
   * @param publicId The public ID of the assignment
   * @param assignment The updated assignment data
   * @returns Observable of AssignmentResponse
   */
  updateAssignmentStatus(
    publicId: string,
    assignment: AssignmentUpdateRequest
  ): Observable<AssignmentResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.put<AssignmentResponse>(
    //   `${this.baseUrl}/${publicId}`,
    //   assignment
    // );

    // Use mock data
    const updatedAssignment = this.mockAssignments.find((a) => a.publicId === publicId);
    if (updatedAssignment) {
      Object.assign(updatedAssignment, assignment);
    }
    return of(updatedAssignment);
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
    this.mockAssignments = this.mockAssignments.filter((a) => a.publicId !== publicId);
    return of(null);
  }

  /**
   * Get all assignments
   * @returns Observable of AssignmentResponse[]
   */
  getAllAssignments(): Observable<AssignmentResponse[]> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<AssignmentResponse[]>(this.baseUrl);

    // Use mock data
    return of(this.mockAssignments);
  }

  /**
   * Create a new evaluation assignment
   * @param assignment The assignment data
   * @returns Observable of AssignmentResponse
   */
  createAssignment(assignment: AssignmentRequest): Observable<AssignmentResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.post<AssignmentResponse>(this.baseUrl, assignment);

    // Use mock data
    const newAssignment = {
      id: this.mockAssignments.length + 1,
      publicId: `assignment-${this.mockAssignments.length + 1}`,
      proposalTitle: 'Proposal ' + (this.mockAssignments.length + 1),
      evaluatorName: 'Evaluator ' + (this.mockAssignments.length + 1),
      rubricName: 'Rubric ' + (this.mockAssignments.length + 1),
      status: 'NOT_STARTED',
      totalScore: 0,
      assignedDate: new Date().toISOString(),
      completedDate: new Date().toISOString(),
      scores: [],
    };
    this.mockAssignments.push(newAssignment);
    return of(newAssignment);
  }
}
