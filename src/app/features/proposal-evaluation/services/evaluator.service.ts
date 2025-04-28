import { Injectable } from "@angular/core"
import { type Observable, of, throwError } from "rxjs"
import { delay } from "rxjs/operators"
import type {
  EvaluatorRequest,
  EvaluatorResponse,
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
      expertise: "Machine Learning",
      maxAssignments: 5,
      type: "DOCUMENT_REVIEWER",
      evaluator: {
        id:3,
        name: "John bb",
        userName: "john_smith_123",
        email: "john.smith@example.com",
        researchInterests: "Artificial Intelligence, Machine Learning",
        academicPosition: "Senior Researcher",
        academicDegreeLevel: "PhD",
        fieldOfStudy: "Computer Science",
      },
   

    },
    {
      id: 2,
      publicId: "eval-2",
      expertise: "Data Science",
      maxAssignments: 3,
      type: "DOCUMENT_REVIEWER",
      evaluator: {
        id:3,
        name: "Jane gf",
        userName: "jane_doe_456",
        email: "jane.doe@example.com",
        researchInterests: "Data Analysis, Big Data",
        academicPosition: "Researcher",
        academicDegreeLevel: "Master's",
        fieldOfStudy: "Data Science",
      },

    },
  ]

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
   * @returns Observable of EvaluatorResponse
   */
  getEvaluator(id: string): Observable<EvaluatorResponse | undefined> {
    // Uncomment when backend is ready
    // return this.http.get<EvaluatorResponse>(`${this.baseUrl}/${id}`)
    //   .pipe(catchError(this.handleError));

    // Mock implementation
    const evaluator = this.mockEvaluators.find((e) => e.publicId === id)
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
     
 
      evaluator:{
        id:3,
        name: "Jane gira",
        userName: "jane_doe_456",
        email: "jane.doe@example.com",
        researchInterests: "Data Analysis, Big Data",
        academicPosition: "Researcher",
        academicDegreeLevel: "Master's",
        fieldOfStudy: "Data Science",
      }
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
      return of({ success: true }).pipe(delay(800)) // Simulate network delay
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
