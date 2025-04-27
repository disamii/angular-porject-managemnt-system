import { Injectable } from "@angular/core"
import { type Observable, of, BehaviorSubject } from "rxjs"
import { delay, tap } from "rxjs/operators"
import type { ScoreRequest, ScoreResponse, ScoreSummary, ScoreUpdateRequest } from "../models/score.model"

@Injectable({
  providedIn: "root",
})
export class ScoreService {
  private baseUrl = "/api/score" // Base URL for the API

  // Auto-save status tracking
  private autoSaveStatusSubject = new BehaviorSubject<{
    status: "idle" | "saving" | "saved" | "error"
    timestamp?: Date
  }>({
    status: "idle",
  })

  autoSaveStatus$ = this.autoSaveStatusSubject.asObservable()

  // Updated mock data to match ScoreResponse interface
  private mockScores: ScoreResponse[] = [
    {
      id: 1,
      publicId: "score-1",
      assignmentPublicId: 1,
      criteriaId: 1,
      awardedScore: 8,
      maxScore: 10,
      conditionMet: true,
      comments: "Excellent work on the methodology section.",
      criteriaName: "Research Methodology",
    },
    {
      id: 2,
      publicId: "score-2",
      assignmentPublicId: 1,
      criteriaId: 2,
      awardedScore: 7,
      maxScore: 10,
      conditionMet: true,
      comments: "Good literature review.",
      criteriaName: "Literature Review",
    },
    {
      id: 3,
      publicId: "score-3",
      assignmentPublicId: 2,
      criteriaId: 3,
      awardedScore: 5,
      maxScore: 8,
      conditionMet: false,
      comments: "Budget justification needs improvement.",
      criteriaName: "Budget Justification",
    },
    {
      id: 4,
      publicId: "score-4",
      assignmentPublicId: 2,
      criteriaId: 4,
      awardedScore: 9,
      maxScore: 10,
      conditionMet: true,
      comments: "Excellent timeline with clear milestones.",
      criteriaName: "Timeline Feasibility",
    },
  ]

  // constructor(private http: HttpClient) {}

  /**
   * Get a specific score by public ID
   * @param scoreId The public ID of the score
   * @returns Observable of ScoreResponse
   */
  getScore(scoreId: string): Observable<ScoreResponse | undefined> {
    // Use mock data
    const score = this.mockScores.find((s) => s.publicId === scoreId)
    return of(score).pipe(delay(300)) // Simulate network delay
  }

  /**
   * Update a score by public ID
   * @param scoreId The public ID of the score
   * @param score The updated score data
   * @returns Observable of ScoreResponse
   */
  updateScore(scoreId: string, score: ScoreUpdateRequest): Observable<ScoreResponse | undefined> {
    // Update auto-save status
    this.autoSaveStatusSubject.next({
      status: "saving",
    })

    const updatedScore = this.mockScores.find((s) => s.publicId === scoreId)
    if (updatedScore) {
      Object.assign(updatedScore, {
        awardedScore: score.awardedScore,
        conditionMet: score.conditionMet,
        comments: score.comments,
        lastUpdated: new Date().toISOString(),
      })
    }

    return of(updatedScore).pipe(
      delay(800), // Simulate network delay
      tap(() => {
        // Update auto-save status
        this.autoSaveStatusSubject.next({
          status: "saved",
          timestamp: new Date(),
        })
      }),
    )
  }

  /**
   * Get all scores
   * @returns Observable of ScoreResponse[]
   */
  getAllScores(): Observable<ScoreResponse[]> {
    return of(this.mockScores).pipe(delay(500)) // Simulate network delay
  }

  /**
   * Get all scores for an assignment
   * @param assignmentId The assignment ID
   * @returns Observable of ScoreResponse[]
   */
  getScoresByAssignment(assignmentId: string): Observable<ScoreResponse[]> {
    const scores = this.mockScores.filter((s) => s.assignmentPublicId.toString() === assignmentId)
    return of(scores).pipe(delay(500)) // Simulate network delay
  }

  /**
   * Submit scores for an assignment
   * @param scores The array of score data
   * @returns Observable of ScoreResponse[]
   */
  submitScores(scores: ScoreRequest[]): Observable<ScoreResponse[] | undefined> {
    const newScores: ScoreResponse[] = scores.map((score, index) => ({
      id: this.mockScores.length + index + 1,
      publicId: `score-${this.mockScores.length + index + 1}`,
      assignmentPublicId: 1,
      criteriaId: score.criteriaId,
      awardedScore: score.awardedScore,
      maxScore: 10, // Default maxScore
      conditionMet: score.conditionMet,
      comments: score.comments || "",
      criteriaName: `Criterion ${this.mockScores.length + index + 1}`,
    }))

    this.mockScores.push(...newScores)
    return of(newScores).pipe(delay(1000)) // Simulate network delay
  }

  /**
   * Save a single score (create or update)
   * @param score The score data
   * @returns Observable of ScoreResponse
   */
  saveScore(score: ScoreRequest): Observable<ScoreResponse> {
    this.autoSaveStatusSubject.next({
      status: "saving",
    })

    const existingScore = this.mockScores.find(
      (s) => s.assignmentPublicId === score.assignmentPublicId && s.criteriaId === score.criteriaId,
    )

    if (existingScore) {
      Object.assign(existingScore, {
        awardedScore: score.awardedScore,
        conditionMet: score.conditionMet,
        comments: score.comments,
        lastUpdated: new Date().toISOString(),
      })

      return of(existingScore).pipe(
        delay(700), // Simulate network delay
        tap(() => {
          this.autoSaveStatusSubject.next({
            status: "saved",
            timestamp: new Date(),
          })
        }),
      )
    } else {
      const newScore: ScoreResponse = {
        id: this.mockScores.length + 1,
        publicId: `score-${this.mockScores.length + 1}`,
        assignmentPublicId: score.assignmentPublicId,
        criteriaId: score.criteriaId,
        awardedScore: score.awardedScore,
        maxScore: 10,
        conditionMet: score.conditionMet,
        comments: score.comments,
        criteriaName: "New Criterion",
      }

      this.mockScores.push(newScore)

      return of(newScore).pipe(
        delay(700), // Simulate network delay
        tap(() => {
          this.autoSaveStatusSubject.next({
            status: "saved",
            timestamp: new Date(),
          })
        }),
      )
    }
  }

  /**
   * Get score summary for an assignment
   * @param assignmentId The assignment ID
   * @returns Observable of ScoreSummary
   */
  getScoreSummary(assignmentId: string): Observable<ScoreSummary | undefined> {
    const assignmentScores = this.mockScores.filter((s) => s.assignmentPublicId.toString() === assignmentId)
    const totalScore = assignmentScores.reduce((sum, score) => sum + score.awardedScore, 0)
    const maxPossibleScore = assignmentScores.reduce((sum, score) => sum + score.maxScore, 0)
    const percentageScore = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0

    const sections = [...new Set(assignmentScores.map((score) => score.criteriaName))]
    const totalSections = sections.length
    const totalCriteria = assignmentScores.length
    const criteriaScored = assignmentScores.filter((score) => score.awardedScore > 0).length
    const completionPercentage = totalCriteria > 0 ? (criteriaScored / totalCriteria) * 100 : 0

    let status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" = "NOT_STARTED"
    if (completionPercentage === 100) {
      status = "COMPLETED"
    } else if (completionPercentage > 0) {
      status = "IN_PROGRESS"
    }

    return of({
      totalScore,
      maxPossibleScore,
      percentageScore,
      sectionsCompleted: sections.length,
      totalSections,
      criteriaScored,
      totalCriteria,
      completionPercentage,
      status,
    }).pipe(delay(800)) // Simulate network delay
  }
}
