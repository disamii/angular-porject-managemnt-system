import { Injectable } from "@angular/core"
import { type Observable, of, throwError } from "rxjs"
import { delay } from "rxjs/operators"
import type {
  EvaluatorRequest,
  EvaluatorResponse,
  EvaluatorDetailResponse,
  EvaluatorStats,
} from "../models/evaluator.model"

@Injectable({
  providedIn: "root",
})
export class EvaluatorService {
  private baseUrl = "/api/evaluators"

  // Mock data for development
  private mockEvaluators: EvaluatorResponse[] = [
    {
      id: 1,
      publicId: "eval-1",
      name: "John Smith",
      email: "john.smith@example.com",
      organization: "Acme Corporation",
      type: "INTERNAL",
      expertise: ["Technical", "Financial"],
      isActive: true,
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-06-20"),
      assignmentCount: 12,
      completedAssignmentCount: 10,
    },
    {
      id: 2,
      publicId: "eval-2",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      organization: "XYZ Industries",
      type: "EXTERNAL",
      expertise: ["Management", "Legal"],
      isActive: true,
      createdAt: new Date("2023-02-10"),
      updatedAt: new Date("2023-07-05"),
      assignmentCount: 8,
      completedAssignmentCount: 7,
    },
    {
      id: 3,
      publicId: "eval-3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      organization: "ABC Consultants",
      type: "SUBJECT_MATTER_EXPERT",
      expertise: ["Technical", "Research"],
      isActive: false,
      createdAt: new Date("2023-03-20"),
      updatedAt: new Date("2023-05-15"),
      assignmentCount: 5,
      completedAssignmentCount: 3,
    },
  ]

  private mockEvaluatorDetails: { [key: string]: EvaluatorDetailResponse } = {
    "eval-1": {
      id: 1,
      publicId: "eval-1",
      name: "John Smith",
      email: "john.smith@example.com",
      organization: "Acme Corporation",
      type: "INTERNAL",
      expertise: ["Technical", "Financial"],
      isActive: true,
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-06-20"),
      assignmentCount: 12,
      completedAssignmentCount: 10,
      averageScore: 85.5,
      averageCompletionTime: 4.2,
      onTimePercentage: 92,
      recentAssignments: [
        {
          id: "assign-1",
          proposalTitle: "Cloud Infrastructure Upgrade",
          status: "COMPLETED",
          dueDate: new Date("2023-06-15"),
          assignedDate: new Date("2023-06-01"),
          completedDate: new Date("2023-06-12"),
        },
        {
          id: "assign-2",
          proposalTitle: "Data Center Consolidation",
          status: "COMPLETED",
          dueDate: new Date("2023-07-10"),
          assignedDate: new Date("2023-06-25"),
          completedDate: new Date("2023-07-08"),
        },
        {
          id: "assign-3",
          proposalTitle: "Network Security Enhancement",
          status: "IN_PROGRESS",
          dueDate: new Date("2023-08-05"),
          assignedDate: new Date("2023-07-20"),
        },
      ],
      expertiseAreas: [
        { name: "Technical", count: 7 },
        { name: "Financial", count: 5 },
      ],
    },
    "eval-2": {
      id: 2,
      publicId: "eval-2",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      organization: "XYZ Industries",
      type: "EXTERNAL",
      expertise: ["Management", "Legal"],
      isActive: true,
      createdAt: new Date("2023-02-10"),
      updatedAt: new Date("2023-07-05"),
      assignmentCount: 8,
      completedAssignmentCount: 7,
      averageScore: 78.3,
      averageCompletionTime: 5.1,
      onTimePercentage: 85,
      recentAssignments: [
        {
          id: "assign-4",
          proposalTitle: "Corporate Restructuring",
          status: "COMPLETED",
          dueDate: new Date("2023-05-20"),
          assignedDate: new Date("2023-05-01"),
          completedDate: new Date("2023-05-18"),
        },
        {
          id: "assign-5",
          proposalTitle: "Legal Compliance Audit",
          status: "COMPLETED",
          dueDate: new Date("2023-06-30"),
          assignedDate: new Date("2023-06-10"),
          completedDate: new Date("2023-06-28"),
        },
        {
          id: "assign-6",
          proposalTitle: "Governance Framework",
          status: "IN_PROGRESS",
          dueDate: new Date("2023-08-15"),
          assignedDate: new Date("2023-07-25"),
        },
      ],
      expertiseAreas: [
        { name: "Management", count: 5 },
        { name: "Legal", count: 3 },
      ],
    },
  }

  // constructor(private http: HttpClient) {}

  /**
   * Get all evaluators
   * @returns Observable of EvaluatorResponse[]
   */
  getEvaluators(): Observable<EvaluatorResponse[]> {
    // Uncomment when backend is ready
    // return this.http.get<EvaluatorResponse[]>(this.baseUrl)
    //   .pipe(catchError(this.handleError));

    // Mock implementation
    return of(this.mockEvaluators).pipe(delay(800)) // Simulate network delay
  }

  /**
   * Get evaluator by ID
   * @param id Evaluator ID
   * @returns Observable of EvaluatorDetailResponse
   */
  getEvaluator(id: string): Observable<EvaluatorDetailResponse | undefined> {
    // Uncomment when backend is ready
    // return this.http.get<EvaluatorDetailResponse>(`${this.baseUrl}/${id}`)
    //   .pipe(catchError(this.handleError));

    // Mock implementation
    const evaluator = this.mockEvaluatorDetails[id]
    return of(evaluator)
  }

  /**
   * Create a new evaluator
   * @param evaluator Evaluator data
   * @returns Observable of EvaluatorResponse
   */
  createEvaluator(evaluator: EvaluatorRequest): Observable<EvaluatorResponse> {
    // Uncomment when backend is ready
    // return this.http.post<EvaluatorResponse>(this.baseUrl, evaluator)
    //   .pipe(catchError(this.handleError));

    // Mock implementation
    const newEvaluator: EvaluatorResponse = {
      id: this.mockEvaluators.length + 1,
      publicId: `eval-${this.mockEvaluators.length + 1}`,
      ...evaluator,
      createdAt: new Date(),
      updatedAt: new Date(),
      assignmentCount: 0,
      completedAssignmentCount: 0,
    }
    this.mockEvaluators.push(newEvaluator)
    return of(newEvaluator).pipe(delay(800)) // Simulate network delay
  }

  /**
   * Update an evaluator
   * @param id Evaluator ID
   * @param evaluator Updated evaluator data
   * @returns Observable of EvaluatorResponse
   */
  updateEvaluator(id: string, evaluator: EvaluatorRequest): Observable<EvaluatorResponse> {
    // Uncomment when backend is ready
    // return this.http.put<EvaluatorResponse>(`${this.baseUrl}/${id}`, evaluator)
    //   .pipe(catchError(this.handleError));

    // Mock implementation
    const index = this.mockEvaluators.findIndex((e) => e.publicId === id)
    if (index !== -1) {
      const updatedEvaluator = {
        ...this.mockEvaluators[index],
        ...evaluator,
        updatedAt: new Date(),
      }
      this.mockEvaluators[index] = updatedEvaluator

      // Also update the detailed record if it exists
      if (this.mockEvaluatorDetails[id]) {
        this.mockEvaluatorDetails[id] = {
          ...this.mockEvaluatorDetails[id],
          ...evaluator,
          updatedAt: new Date(),
        }
      }

      return of(updatedEvaluator).pipe(delay(800)) // Simulate network delay
    }
    return throwError(() => new Error("Evaluator not found"))
  }

  /**
   * Delete an evaluator
   * @param id Evaluator ID
   * @returns Observable of any
   */
  deleteEvaluator(id: string): Observable<any> {
    // Uncomment when backend is ready
    // return this.http.delete(`${this.baseUrl}/${id}`)
    //   .pipe(catchError(this.handleError));

    // Mock implementation
    const index = this.mockEvaluators.findIndex((e) => e.publicId === id)
    if (index !== -1) {
      this.mockEvaluators.splice(index, 1)
      delete this.mockEvaluatorDetails[id]
      return of({ success: true }).pipe(delay(800)) // Simulate network delay
    }
    return throwError(() => new Error("Evaluator not found"))
  }

  /**
   * Get evaluator statistics
   * @param id Evaluator ID
   * @returns Observable of EvaluatorStats
   */
  getEvaluatorStats(id: string): Observable<EvaluatorStats> {
    // Uncomment when backend is ready
    // return this.http.get<EvaluatorStats>(`${this.baseUrl}/${id}/stats`)
    //   .pipe(catchError(this.handleError));

    // Mock implementation
    const evaluator = this.mockEvaluatorDetails[id]
    if (evaluator) {
      return of({
        totalAssignments: evaluator.assignmentCount,
        completedAssignments: evaluator.completedAssignmentCount,
        pendingAssignments: evaluator.assignmentCount - evaluator.completedAssignmentCount,
        averageScore: evaluator.averageScore,
        averageCompletionTime: evaluator.averageCompletionTime,
        onTimePercentage: evaluator.onTimePercentage,
      }).pipe(delay(800)) // Simulate network delay
    }
    return throwError(() => new Error("Evaluator not found"))
  }

  /**
   * Handle HTTP errors
   * @param error The error response
   * @returns Observable with error
   */
  private handleError(error: any): Observable<never> {
    console.error("API error:", error)
    return throwError(() => new Error(error.message || "Server error"))
  }
}
