import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import type {
  EvaluationRubricRequest,
  EvaluationRubricResponse,
  EvaluationRubricUpdateRequest,
  EvaluationRubricUpdateResponse,
  EvaluationRubricStatusResponse,
} from "../models/evaluation-rubrics.model"

@Injectable({
  providedIn: "root",
})
export class EvaluationRubricService {
  private baseUrl = "/public/api/rubrics" // Base URL for the API

  // Centralized mock data
  private mockRubrics: EvaluationRubricResponse[] = [
    {
      id: 1,
      publicId: "rubric-1",
      name: "Sample Rubric 1",
      version: "1.0",
      description: "This is the first sample rubric.",
      documentPassingScore: 70,
      presentationPassingScore: 80,
      status: "ACTIVE",
      sections: [
        {
          id: 1,
          publicId: "section-1",
          title: "Section 1",
          description: "This is the first section.",
          weight: 50,
          displayOrder: 1,
          status: "ACTIVE",
          criteria: [
            {
              id: 1,
              name: "Criterion 1",
              publicId: "criterion-1",
              description: "This is the first criterion.",
              maxScore: 10,
              scoreType: "DIRECT_SCORE",
              condition: "Condition 1",
              conditionMetScore: 5,
              conditionNotMetScore: 0,
              phase: "DOCUMENT_REVIEW",
              status: "ACTIVE",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      publicId: "rubric-2",
      name: "Sample Rubric 2",
      version: "1.0",
      description: "This is the second sample rubric.",
      documentPassingScore: 65,
      presentationPassingScore: 75,
      status: "DRAFT",
      sections: [
        {
          id: 2,
          publicId: "section-2",
          title: "Section 2",
          description: "This is the second section.",
          weight: 40,
          displayOrder: 2,
          status: "ACTIVE",
          criteria: [
            {
              id: 2,
              name: "Criterion 2",
              publicId: "criterion-2",
              description: "This is the second criterion.",
              maxScore: 8,
              scoreType: "DIRECT_SCORE",
              condition: "Condition 2",
              conditionMetScore: 4,
              conditionNotMetScore: 0,
              phase: "PRESENTATION_REVIEW",
              status: "ACTIVE",
            },
          ],
        },
      ],
    },
  ]

  // constructor(private http: HttpClient) {}

  /**
   * Get an evaluation rubric by publicId
   * @param publicId The public ID of the evaluation rubric
   * @returns Observable of EvaluationRubricResponse
   */
  getRubricByPublicId(publicId: string): Observable<EvaluationRubricResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<EvaluationRubricResponse>(`${this.baseUrl}/${publicId}`);

    // Use mock data
    const rubric = this.mockRubrics.find((r) => r.publicId === publicId)
    return of(rubric)
  }

  /**
   * Update an evaluation rubric
   * @param publicId The public ID of the evaluation rubric
   * @param rubric The updated evaluation rubric data
   * @returns Observable of EvaluationRubricUpdateResponse
   */
  updateRubric(publicId: string, rubric: EvaluationRubricUpdateRequest): Observable<EvaluationRubricUpdateResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.put<EvaluationRubricUpdateResponse>(
    //   `${this.baseUrl}/${publicId}`,
    //   rubric
    // );

    // Use mock data
    const updatedRubric = { ...rubric, id: 1, publicId, version: "1.1", status: "DRAFT" }
    return of(updatedRubric as EvaluationRubricUpdateResponse)
  }

  /**
   * Delete an evaluation rubric
   * @param publicId The public ID of the evaluation rubric
   * @returns Observable of any
   */
  deleteRubric(publicId: string): Observable<any> {
    // Uncomment the line below when the backend is ready
    // return this.http.delete(`${this.baseUrl}/${publicId}`);

    // Use mock data
    this.mockRubrics = this.mockRubrics.filter((r) => r.publicId !== publicId)
    return of(null)
  }

  /**
   * Get all evaluation rubrics
   * @returns Observable of EvaluationRubricResponse[]
   */
  getAllRubrics(): Observable<EvaluationRubricResponse[]> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<EvaluationRubricResponse[]>(this.baseUrl);

    // Use mock data
    return of(this.mockRubrics)
  }

  /**
   * Create a new evaluation rubric
   * @param rubric The evaluation rubric data
   * @returns Observable of EvaluationRubricResponse
   */
  createRubric(rubric: EvaluationRubricRequest): Observable<EvaluationRubricResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.post<EvaluationRubricResponse>(this.baseUrl, rubric);

    // Use mock data
    const newRubric = { ...rubric, id: this.mockRubrics.length + 1, publicId: `rubric-${this.mockRubrics.length + 1}` }
    this.mockRubrics.push(newRubric as EvaluationRubricResponse)
    return of(newRubric as EvaluationRubricResponse)
  }

  /**
   * Change the status of an evaluation rubric
   * @param publicId The public ID of the evaluation rubric
   * @param status The new status of the evaluation rubric
   * @returns Observable of EvaluationRubricStatusResponse
   */
  changeRubricStatus(publicId: string, status: string): Observable<EvaluationRubricStatusResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.patch<EvaluationRubricStatusResponse>(
    //   `${this.baseUrl}/${publicId}/status`,
    //   { status }
    // );

    // Use mock data
    const rubric = this.mockRubrics.find((r) => r.publicId === publicId)
    if (rubric) {
      rubric.status = status
    }
    return of(rubric as EvaluationRubricStatusResponse)
  }

  /**
   * Search rubrics with filters
   * @param filters The search filters
   * @returns Observable of EvaluationRubricResponse[]
   */
  searchRubrics(filters: { [key: string]: any }): Observable<EvaluationRubricResponse[]> {
    // Uncomment the line below when the backend is ready
    // let params = new HttpParams();
    // for (const key in filters) {
    //   if (filters[key]) {
    //     params = params.set(key, filters[key]);
    //   }
    // }
    // return this.http.get<EvaluationRubricResponse[]>(`${this.baseUrl}/search`, { params });

    // Use mock data
    let filteredRubrics = this.mockRubrics
    for (const key in filters) {
      if (filters[key]) {
        filteredRubrics = filteredRubrics.filter((r) => r[key as keyof EvaluationRubricResponse] === filters[key])
      }
    }
    return of(filteredRubrics)
  }
}
