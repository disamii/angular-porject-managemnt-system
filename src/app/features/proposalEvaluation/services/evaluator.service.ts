import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EvaluatorRequest, EvaluatorResponse, EvaluatorUpdateRequest } from '../models/evaluator.model';

@Injectable({
  providedIn: 'root',
})
export class EvaluatorService {
  private baseUrl = '/public/api/evaluators'; 

  // Centralized mock data
  private mockEvaluators: EvaluatorResponse[] = [
    {
      id: 1,
      publicId: 'evaluator-1',
      userId: 101,
      expertise: 'Expertise 1',
      maxAssignments: 5,
      type: 'DOCUMENT_REVIEWER',
      evaluatorName: 'Evaluator 1',
    },
    {
      id: 2,
      publicId: 'evaluator-2',
      userId: 102,
      expertise: 'Expertise 2',
      maxAssignments: 3,
      type: 'PRESENTATION_REVIEWER',
      evaluatorName: 'Evaluator 2',
    },
  ];

  constructor(private http: HttpClient) {}

  /**
   * Get evaluator details by public ID
   * @param publicId The public ID of the evaluator
   * @returns Observable of EvaluatorResponse
   */
  getEvaluator(publicId: string): Observable<EvaluatorResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<EvaluatorResponse>(`${this.baseUrl}/${publicId}`);

    // Use mock data
    const evaluator = this.mockEvaluators.find((e) => e.publicId === publicId);
    return of(evaluator);
  }

  /**
   * Update an evaluator by public ID
   * @param publicId The public ID of the evaluator
   * @param evaluator The updated evaluator data
   * @returns Observable of EvaluatorResponse
   */
  updateEvaluator(
    publicId: string,
    evaluator: EvaluatorUpdateRequest
  ): Observable<EvaluatorResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.put<EvaluatorResponse>(
    //   `${this.baseUrl}/${publicId}`,
    //   evaluator
    // );

    // Use mock data
    const updatedEvaluator = this.mockEvaluators.find((e) => e.publicId === publicId);
    if (updatedEvaluator) {
      Object.assign(updatedEvaluator, evaluator);
    }
    return of(updatedEvaluator);
  }

  /**
   * Delete an evaluator by public ID
   * @param publicId The public ID of the evaluator
   * @returns Observable of any
   */
  deleteEvaluator(publicId: string): Observable<any> {
    // Uncomment the line below when the backend is ready
    // return this.http.delete(`${this.baseUrl}/${publicId}`);

    // Use mock data
    this.mockEvaluators = this.mockEvaluators.filter((e) => e.publicId !== publicId);
    return of(null);
  }

  /**
   * Get all evaluators
   * @returns Observable of EvaluatorResponse[]
   */
  getAllEvaluators(): Observable<EvaluatorResponse[]> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<EvaluatorResponse[]>(this.baseUrl);

    // Use mock data
    return of(this.mockEvaluators);
  }

  /**
   * Create a new evaluator
   * @param evaluator The evaluator data
   * @returns Observable of EvaluatorResponse
   */
  createEvaluator(evaluator: EvaluatorRequest): Observable<EvaluatorResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.post<EvaluatorResponse>(this.baseUrl, evaluator);

    // Use mock data
    const newEvaluator = {
      ...evaluator,
      id: this.mockEvaluators.length + 1,
      publicId: `evaluator-${this.mockEvaluators.length + 1}`,
      evaluatorName: `Evaluator ${this.mockEvaluators.length + 1}`,
    };
    this.mockEvaluators.push(newEvaluator as EvaluatorResponse);
    return of(newEvaluator as EvaluatorResponse);
  }
}
