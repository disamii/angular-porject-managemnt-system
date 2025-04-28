import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"
import type { EvaluatorDashboard, Assignment, AssignmentSubmission } from "../models/evaluator-dashboard.model"

@Injectable({
  providedIn: "root",
})
export class EvaluatorDashboardService {
  // Mock data for development
  private mockDashboardData: EvaluatorDashboard = {
    user: {
      id: 5,
      publicId: "USR-8392",
      fullName: "Dr. Samson Mamuye",
      email: "samson@example.com",
      role: "EVALUATOR",
      expertise: "AI, Biomedical Engineering",
    },
    assignments: [
      {
        assignmentId: 12,
        publicId: "ASSGN-2024-001",
        status: "IN_PROGRESS",
        assignedDate: "2025-04-25T10:00:00",
        completedDate: null,
        dueDate: "2025-05-25T10:00:00",
        proposal: {
          id: 30,
          publicId: "PROP-ABC-2024",
          title: "Smart Healthcare System using AI",
          principalInvestigator: "Prof. Helen Getachew",
          organization: "Bahir Dar University",
          documentUrl: "https://example.com/proposals/PROP-ABC-2024.pdf",
        },
        rubric: {
          id: 7,
          name: "NSF 2024 Research Evaluation Rubric",
          version: "1.0",
          documentPassingScore: 50,
          presentationPassingScore: 50,
        },
        scores: [
          {
            criterionId: 101,
            criterionName: "Feasibility",
            maxScore: 15,
            scoreType: "DIRECT_SCORE",
            awardedScore: 13,
            comments: "Very realistic plan, minor risks.",
          },
          {
            criterionId: 102,
            criterionName: "Timeline Realism",
            maxScore: 10,
            scoreType: "CONDITIONAL_SCORE",
            conditionDescription: "Timeline is feasible if all resources available",
            conditionMet: true,
            awardedScore: 8,
            comments: "Timeline is achievable but needs final review.",
          },
          {
            criterionId: 103,
            criterionName: "Innovation Level",
            maxScore: 20,
            scoreType: "DIRECT_SCORE",
            awardedScore: 0,
            comments: "",
          },
          {
            criterionId: 104,
            criterionName: "Budget Appropriateness",
            maxScore: 15,
            scoreType: "DIRECT_SCORE",
            awardedScore: 0,
            comments: "",
          },
          {
            criterionId: 105,
            criterionName: "Impact Potential",
            maxScore: 25,
            scoreType: "DIRECT_SCORE",
            awardedScore: 0,
            comments: "",
          },
          {
            criterionId: 106,
            criterionName: "Team Qualifications",
            maxScore: 15,
            scoreType: "CONDITIONAL_SCORE",
            conditionDescription: "Team has necessary expertise for all aspects of the project",
            conditionMet: false,
            awardedScore: 0,
            comments: "",
          },
        ],
      },
      {
        assignmentId: 13,
        publicId: "ASSGN-2024-002",
        status: "NOT_STARTED",
        assignedDate: "2025-04-27T14:30:00",
        completedDate: null,
        dueDate: "2025-05-27T14:30:00",
        proposal: {
          id: 31,
          publicId: "PROP-DEF-2024",
          title: "Renewable Energy Solutions for Rural Areas",
          principalInvestigator: "Dr. Abebe Bekele",
          organization: "Addis Ababa University",
          documentUrl: "https://example.com/proposals/PROP-DEF-2024.pdf",
        },
        rubric: {
          id: 8,
          name: "Energy Innovation Evaluation Rubric",
          version: "2.1",
          documentPassingScore: 60,
          presentationPassingScore: 55,
        },
        scores: [
          {
            criterionId: 201,
            criterionName: "Technical Feasibility",
            maxScore: 20,
            scoreType: "DIRECT_SCORE",
            awardedScore: 0,
            comments: "",
          },
          {
            criterionId: 202,
            criterionName: "Cost Effectiveness",
            maxScore: 15,
            scoreType: "DIRECT_SCORE",
            awardedScore: 0,
            comments: "",
          },
          {
            criterionId: 203,
            criterionName: "Environmental Impact",
            maxScore: 25,
            scoreType: "DIRECT_SCORE",
            awardedScore: 0,
            comments: "",
          },
          {
            criterionId: 204,
            criterionName: "Scalability",
            maxScore: 15,
            scoreType: "CONDITIONAL_SCORE",
            conditionDescription: "Solution can be scaled to multiple regions",
            conditionMet: false,
            awardedScore: 0,
            comments: "",
          },
          {
            criterionId: 205,
            criterionName: "Community Engagement",
            maxScore: 15,
            scoreType: "DIRECT_SCORE",
            awardedScore: 0,
            comments: "",
          },
        ],
      },
      {
        assignmentId: 14,
        publicId: "ASSGN-2024-003",
        status: "COMPLETED",
        assignedDate: "2025-04-20T09:15:00",
        completedDate: "2025-04-24T16:45:00",
        dueDate: "2025-05-20T09:15:00",
        proposal: {
          id: 32,
          publicId: "PROP-GHI-2024",
          title: "Machine Learning for Crop Disease Detection",
          principalInvestigator: "Dr. Tigist Haile",
          organization: "Jimma University",
          documentUrl: "https://example.com/proposals/PROP-GHI-2024.pdf",
        },
        rubric: {
          id: 7,
          name: "NSF 2024 Research Evaluation Rubric",
          version: "1.0",
          documentPassingScore: 50,
          presentationPassingScore: 50,
        },
        scores: [
          {
            criterionId: 101,
            criterionName: "Feasibility",
            maxScore: 15,
            scoreType: "DIRECT_SCORE",
            awardedScore: 14,
            comments: "Highly feasible with strong preliminary results.",
          },
          {
            criterionId: 102,
            criterionName: "Timeline Realism",
            maxScore: 10,
            scoreType: "CONDITIONAL_SCORE",
            conditionDescription: "Timeline is feasible if all resources available",
            conditionMet: true,
            awardedScore: 9,
            comments: "Well-planned timeline with reasonable milestones.",
          },
          {
            criterionId: 103,
            criterionName: "Innovation Level",
            maxScore: 20,
            scoreType: "DIRECT_SCORE",
            awardedScore: 18,
            comments: "Novel approach to disease detection using advanced ML techniques.",
          },
          {
            criterionId: 104,
            criterionName: "Budget Appropriateness",
            maxScore: 15,
            scoreType: "DIRECT_SCORE",
            awardedScore: 12,
            comments: "Budget is generally appropriate but some equipment costs seem high.",
          },
          {
            criterionId: 105,
            criterionName: "Impact Potential",
            maxScore: 25,
            scoreType: "DIRECT_SCORE",
            awardedScore: 22,
            comments: "High potential impact for agricultural productivity in the region.",
          },
          {
            criterionId: 106,
            criterionName: "Team Qualifications",
            maxScore: 15,
            scoreType: "CONDITIONAL_SCORE",
            conditionDescription: "Team has necessary expertise for all aspects of the project",
            conditionMet: true,
            awardedScore: 14,
            comments: "Excellent team with complementary expertise.",
          },
        ],
      },
    ],
  }

  constructor() {}

  /**
   * Get evaluator dashboard data
   */
  getDashboardData(): Observable<EvaluatorDashboard> {
    // In a real app, this would be an HTTP request
    return of(this.mockDashboardData).pipe(delay(800))
  }

  /**
   * Get a specific assignment by ID
   */
  getAssignment(assignmentId: number): Observable<Assignment | undefined> {
    const assignment = this.mockDashboardData.assignments.find((a) => a.assignmentId === assignmentId)
    return of(assignment).pipe(delay(500))
  }

  /**
   * Submit evaluation scores for an assignment
   */
  submitEvaluation(submission: AssignmentSubmission): Observable<Assignment> {
    // Find the assignment to update
    const assignmentIndex = this.mockDashboardData.assignments.findIndex(
      (a) => a.assignmentId === submission.assignmentId,
    )

    if (assignmentIndex === -1) {
      throw new Error(`Assignment with ID ${submission.assignmentId} not found`)
    }

    // Create a copy of the assignment
    const updatedAssignment = { ...this.mockDashboardData.assignments[assignmentIndex] }

    // Update scores
    submission.scores.forEach((submittedScore) => {
      const scoreIndex = updatedAssignment.scores.findIndex((s) => s.criterionId === submittedScore.criterionId)

      if (scoreIndex !== -1) {
        updatedAssignment.scores[scoreIndex] = {
          ...updatedAssignment.scores[scoreIndex],
          awardedScore: submittedScore.awardedScore,
          comments: submittedScore.comments,
          conditionMet: submittedScore.conditionMet,
        }
      }
    })

    // Check if all scores have been awarded
    const allScoresAwarded = updatedAssignment.scores.every((score) => score.awardedScore > 0)

    // Update status if all scores are awarded
    if (allScoresAwarded) {
      updatedAssignment.status = "COMPLETED"
      updatedAssignment.completedDate = new Date().toISOString()
    } else {
      updatedAssignment.status = "IN_PROGRESS"
    }

    // Update the assignment in the mock data
    this.mockDashboardData.assignments[assignmentIndex] = updatedAssignment

    // Return the updated assignment
    return of(updatedAssignment).pipe(delay(1000))
  }

  /**
   * Save partial evaluation (save progress without completing)
   */
  saveEvaluationProgress(submission: AssignmentSubmission): Observable<Assignment> {
    // Find the assignment to update
    const assignmentIndex = this.mockDashboardData.assignments.findIndex(
      (a) => a.assignmentId === submission.assignmentId,
    )

    if (assignmentIndex === -1) {
      throw new Error(`Assignment with ID ${submission.assignmentId} not found`)
    }

    // Create a copy of the assignment
    const updatedAssignment = { ...this.mockDashboardData.assignments[assignmentIndex] }

    // Update scores
    submission.scores.forEach((submittedScore) => {
      const scoreIndex = updatedAssignment.scores.findIndex((s) => s.criterionId === submittedScore.criterionId)

      if (scoreIndex !== -1) {
        updatedAssignment.scores[scoreIndex] = {
          ...updatedAssignment.scores[scoreIndex],
          awardedScore: submittedScore.awardedScore,
          comments: submittedScore.comments,
          conditionMet: submittedScore.conditionMet,
        }
      }
    })

    // Set status to IN_PROGRESS
    if (updatedAssignment.status === "NOT_STARTED") {
      updatedAssignment.status = "IN_PROGRESS"
    }

    // Update the assignment in the mock data
    this.mockDashboardData.assignments[assignmentIndex] = updatedAssignment

    // Return the updated assignment
    return of(updatedAssignment).pipe(delay(800))
  }
}
