import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import type { EvaluationCriteriaRequest, EvaluationCriteriaResponse } from "../models/evaluation-criteria.model"

@Injectable({
  providedIn: "root",
})
export class EvaluationCriteriaService {
  private baseUrl = "/public/api/rubrics" // Base URL for the API

  // Centralized mock data
  private mockCriteria: EvaluationCriteriaResponse[] = [
    {
      id: 1,
      publicId: "criterion-1",
      name: "Criterion 1",
      description: "This is the first criterion.",
      maxScore: 10,
      scoreType: "DIRECT_SCORE",
      condition: "Condition 1",
      conditionMetScore: 5,
      conditionNotMetScore: 0,
      phase: "DOCUMENT_REVIEW",
      status: "ACTIVE",
    },
    {
      id: 2,
      publicId: "criterion-2",
      name: "Criterion 2",
      description: "This is the second criterion.",
      maxScore: 8,
      scoreType: "DIRECT_SCORE",
      condition: "Condition 2",
      conditionMetScore: 4,
      conditionNotMetScore: 0,
      phase: "PRESENTATION_REVIEW",
      status: "ACTIVE",
    },
  ]

  // constructor(private http: HttpClient) {}

  /**
   * Get criterion details by ID
   * @param criterionId The ID of the criterion
   * @returns Observable of EvaluationCriteriaResponse
   */
  getCriterion(criterionId: number): Observable<EvaluationCriteriaResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<EvaluationCriteriaResponse>(`${this.baseUrl}/${criterionId}`);

    // Use mock data
    const criterion = this.mockCriteria.find((c) => c.id === criterionId)
    return of(criterion)
  }

  createCriterion(
    criterion: EvaluationCriteriaRequest,
  ): Observable<EvaluationCriteriaResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.put<EvaluationCriteriaResponse>(
    //   `${this.baseUrl}/`,
    //   criterion
    // );
  
    // Use mock data
    const newCriterion = {
      ...criterion,
      id: this.mockCriteria.length + 1,           // Generating a new ID (you can customize this logic)
      publicId: `criterion-${this.mockCriteria.length + 1}`, // Generating a public ID
    };
  
    // Add the new criterion to the mockCriteria array
    this.mockCriteria.push(newCriterion);
  
    // Return the newly created criterion as an observable
    return of(newCriterion);
  }
  
  /**
   * Update a criterion by ID
   * @param criterionId The ID of the criterion
   * @param criterion The updated criterion data
   * @returns Observable of EvaluationCriteriaResponse
   */
  updateCriterion(
    criterionId: number,
    criterion: EvaluationCriteriaRequest,
  ): Observable<EvaluationCriteriaResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.put<EvaluationCriteriaResponse>(
    //   `${this.baseUrl}/${criterionId}`,
    //   criterion
    // );

    // Use mock data
    const updatedCriterion = this.mockCriteria.find((c) => c.id === criterionId)
    if (updatedCriterion) {
      Object.assign(updatedCriterion, criterion)
    }
    return of(updatedCriterion)
  }

  /**
   * Delete a criterion by ID
   * @param criterionId The ID of the criterion
   * @returns Observable of any
   */
  deleteCriterion(criterionId: number): Observable<any> {
    // Uncomment the line below when the backend is ready
    // return this.http.delete(`${this.baseUrl}/${criterionId}`);

    // Use mock data
    this.mockCriteria = this.mockCriteria.filter((c) => c.id !== criterionId)
    return of(null)
  }
}
