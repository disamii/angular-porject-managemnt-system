import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import type {
  RubricSectionRequest,
  RubricSectionResponse,
  RubricSectionUpdateRequest,
} from "../models/rubrics-section.model"

@Injectable({
  providedIn: "root",
})
export class RubricSectionService {
  private baseUrl = "/public/api/rubrics" // Base URL for the API

  // Centralized mock data
  private mockSections: RubricSectionResponse[] = [
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
      ],
    },
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
      ],
    },
  ]

  // constructor(private http: HttpClient) {}

  /**
   * Add a new section to a rubric
   * @param rubricPublicId The public ID of the rubric
   * @param section The new section data
   * @returns Observable of RubricSectionResponse
   */
  addSection(rubricPublicId: string, section: RubricSectionRequest): Observable<RubricSectionResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.post<RubricSectionResponse>(
    //   `${this.baseUrl}/${rubricPublicId}/sections`,
    //   section
    // );

    // Use mock data
    const newSection = {
      ...section,
      id: this.mockSections.length + 1,
      publicId: `section-${this.mockSections.length + 1}`,
      status: "ACTIVE",
    }
    this.mockSections.push(newSection as RubricSectionResponse)
    return of(newSection as RubricSectionResponse)
  }

  /**
   * Get section details
   * @param rubricPublicId The public ID of the rubric
   * @param sectionId The public ID of the section
   * @returns Observable of RubricSectionResponse
   */
  getSection(rubricPublicId: string, sectionId: string): Observable<RubricSectionResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<RubricSectionResponse>(
    //   `${this.baseUrl}/${rubricPublicId}/sections/${sectionId}`
    // );

    // Use mock data
    const section = this.mockSections.find((s) => s.publicId === sectionId)
    return of(section)
  }

  /**
   * Update a rubric section
   * @param rubricPublicId The public ID of the rubric
   * @param sectionId The public ID of the section
   * @param section The updated section data
   * @returns Observable of RubricSectionResponse
   */
  updateSection(
    rubricPublicId: string,
    sectionId: string,
    section: RubricSectionUpdateRequest,
  ): Observable<RubricSectionResponse | undefined> {
    // Uncomment the line below when the backend is ready
    // return this.http.patch<RubricSectionResponse>(
    //   `${this.baseUrl}/${rubricPublicId}/sections/${sectionId}`,
    //   section
    // );

    // Use mock data
    const updatedSection = this.mockSections.find((s) => s.publicId === sectionId)
    if (updatedSection) {
      Object.assign(updatedSection, section)
    }
    return of(updatedSection)
  }

  /**
   * Remove a section from a rubric
   * @param rubricPublicId The public ID of the rubric
   * @param sectionPublicId The public ID of the section
   * @returns Observable of any
   */
  deleteSection(rubricPublicId: string, sectionPublicId: string): Observable<any> {
    // Uncomment the line below when the backend is ready
    // return this.http.delete(`${this.baseUrl}/${rubricPublicId}/sections/${sectionPublicId}`);

    // Use mock data
    this.mockSections = this.mockSections.filter((s) => s.publicId !== sectionPublicId)
    return of(null)
  }
}
