import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatTabsModule } from "@angular/material/tabs"

import  { EvaluatorDashboardService } from "../../services/evaluator-dashboard.service"
import  { EvaluatorDashboard, Assignment } from "../../models/evaluator-dashboard.model"
import  { NotificationService } from "../../../project/services/notification.service"

@Component({
  selector: "app-evaluator-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  templateUrl: "./evaluator-dashboard.component.html",
})
export class EvaluatorDashboardComponent implements OnInit {
  dashboardData: EvaluatorDashboard | null = null
  loading = true
  Math = Math; 
  // Filtered assignments
  pendingAssignments: Assignment[] = []
  completedAssignments: Assignment[] = []

  constructor(
    private dashboardService: EvaluatorDashboardService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadDashboardData()
  }

  loadDashboardData(): void {
    this.loading = true
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data
        this.filterAssignments()
        this.loading = false
      },
      error: (error) => {
        this.notificationService.error("Failed to load dashboard data")
        console.error("Error loading dashboard data:", error)
        this.loading = false
      },
    })
  }

  filterAssignments(): void {
    if (!this.dashboardData) return

    // Filter pending assignments (NOT_STARTED or IN_PROGRESS)
    this.pendingAssignments = this.dashboardData.assignments.filter((assignment) => assignment.status !== "COMPLETED")

    // Filter completed assignments
    this.completedAssignments = this.dashboardData.assignments.filter((assignment) => assignment.status === "COMPLETED")
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "NOT_STARTED":
        return "bg-slate-100 text-slate-700"
      case "IN_PROGRESS":
        return "bg-amber-100 text-amber-700"
      case "COMPLETED":
        return "bg-green-100 text-green-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  calculateProgress(assignment: Assignment): number {
    if (!assignment.scores || assignment.scores.length === 0) {
      return 0
    }

    const scoredCriteria = assignment.scores.filter((score) => score.awardedScore > 0).length
    return Math.round((scoredCriteria / assignment.scores.length) * 100)
  }

  getDaysRemaining(dueDate: string | undefined): number {
    if (!dueDate) return 0

    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  isOverdue(dueDate: string | undefined): boolean {
    return this.getDaysRemaining(dueDate) < 0
  }
}
