import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ScoreRequest, ScoreResponse, ScoreUpdateRequest } from '../models/score.model';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private baseUrl = '/api/score'; // Base URL for the API

  // Centralized mock data
  private mockScores: ScoreResponse[] = [
    {
      id: 1,
      publicId: 'score-1',
      assignmentPublicId: 1,
      criteriaId: 1,
      awardedScore: 8,
      maxScore: 10,
      conditionMet: true,
      comments: 'Excellent work!',
      criteriaName: 'Criterion 1',
    },
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
  ];

  constructor(private http: HttpClient) {}

  /**
   * Get a specific score by public ID
   * @param scoreId The public ID of the score
   * @returns Observable of ScoreResponse
   */
  getScore(scoreId: string): Observable<ScoreResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<ScoreResponse>(`${this.baseUrl}/${scoreId}`);

    // Use mock data
    const score = this.mockScores.find((s) => s.publicId === scoreId);
    return of(score);
  }

  /**
   * Update a score by public ID
   * @param scoreId The public ID of the score
   * @param score The updated score data
   * @returns Observable of ScoreResponse
   */
  updateScore(
    scoreId: string,
    score: ScoreUpdateRequest
  ): Observable<ScoreResponse> {
    // Uncomment the line below when the backend is ready
    // return this.http.put<ScoreResponse>(
    //   `${this.baseUrl}/${scoreId}`,
    //   score
    // );

    // Use mock data
    const updatedScore = this.mockScores.find((s) => s.publicId === scoreId);
    if (updatedScore) {
      Object.assign(updatedScore, score);
    }
    return of(updatedScore);
  }

  /**
   * Get all scores for an assignment
   * @returns Observable of ScoreResponse[]
   */
  getAllScores(): Observable<ScoreResponse[]> {
    // Uncomment the line below when the backend is ready
    // return this.http.get<ScoreResponse[]>(this.baseUrl);

    // Use mock data
    return of(this.mockScores);
  }

  /**
   * Submit scores for an assignment
   * @param scores The array of score data
   * @returns Observable of ScoreResponse[]
   */
  submitScores(scores: ScoreRequest[]): Observable<ScoreResponse[]> {
    // Uncomment the line below when the backend is ready
    // return this.http.post<ScoreResponse[]>(this.baseUrl, scores);

    // Use mock data
    const newScores: ScoreResponse[] = scores.map((score, index) => ({
      id: this.mockScores.length + index + 1,
      publicId: `score-${this.mockScores.length + index + 1}`,
      assignmentPublicId: 1, // You can adjust this as needed
      criteriaId: score.criteriaId,
      awardedScore: score.awardedScore,
      maxScore: 10, // You can adjust this as needed
      conditionMet: score.conditionMet,
      comments: score.comments,
      criteriaName: `Criterion ${this.mockScores.length + index + 1}`,
    }));
    this.mockScores.push(...newScores);
    return of(newScores);
  }
}
