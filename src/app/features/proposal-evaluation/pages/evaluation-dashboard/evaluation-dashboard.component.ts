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

import  { EvaluationRubricService } from "../../services/evaluation-rubric.service"
import  { EvaluatorService } from "../../services/evaluator.service"
import  { EvaluationAssignmentService } from "../../services/evaluation-assignment.service"
import  { EvaluationRubricResponse } from "../../models/evaluation-rubrics.model"
import  { EvaluatorResponse } from "../../models/evaluator.model"
import  { AssignmentResponse } from "../../models/assignment.model"

// Import widget components
import { EvaluationStatsWidgetComponent } from "../../components/dashboard-widgets/evaluation-stats-widget/evaluation-stats-widget.component"
import { EvaluationProgressWidgetComponent } from "../../components/dashboard-widgets/evaluation-progress-widget/evaluation-progress-widget.component"
import { EvaluationActivityWidgetComponent } from "../../components/dashboard-widgets/evaluation-activity-widget/evaluation-activity-widget.component"
import { QuickActionsWidgetComponent } from "../../components/dashboard-widgets/quick-actions-widget/quick-actions-widget.component"
import { AssignmentStatsWidgetComponent } from "../../components/dashboard-widgets/assignment-stats-widget/assignment-stats-widget.component"
import  { NotificationService } from "../../services/notification.service"

@Component({
  selector: "app-evaluation-dashboard",
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
    EvaluationStatsWidgetComponent,
    EvaluationProgressWidgetComponent,
    EvaluationActivityWidgetComponent,
    QuickActionsWidgetComponent,
    AssignmentStatsWidgetComponent,
  ],
  templateUrl: "./evaluation-dashboard-component.html",
})
export class EvaluationDashboardComponent implements OnInit {
  rubrics: EvaluationRubricResponse[] = []
  evaluators: EvaluatorResponse[] = []
  assignments: AssignmentResponse[] = []
  assignmentStats: any = {}
  loading = true

  constructor(
    private rubricService: EvaluationRubricService,
    private evaluatorService: EvaluatorService,
    private assignmentService: EvaluationAssignmentService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.loading = true

    // Load all data in parallel
    Promise.all([this.loadRubrics(), this.loadEvaluators(), this.loadAssignments(), this.loadAssignmentStats()])
      .then(() => {
        this.loading = false
      })
      .catch((error) => {
        this.notificationService.error("Failed to load dashboard data")
        this.loading = false
      })
  }

  loadRubrics(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.rubricService.getAllRubrics().subscribe({
        next: (rubrics) => {
          this.rubrics = rubrics
          resolve()
        },
        error: (err) => {
          this.notificationService.error("Failed to load rubrics")
          reject(err)
        },
      })
    })
  }

  loadEvaluators(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.evaluatorService.getEvaluators().subscribe({
        next: (evaluators) => {
          this.evaluators = evaluators
          resolve()
        },
        error: (err) => {
          this.notificationService.error("Failed to load evaluators")
          reject(err)
        },
      })
    })
  }

  loadAssignments(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.assignmentService.getAllAssignments().subscribe({
        next: (assignments) => {
          this.assignments = assignments
          resolve()
        },
        error: (err) => {
          this.notificationService.error("Failed to load assignments")
          reject(err)
        },
      })
    })
  }

  loadAssignmentStats(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.assignmentService.getAssignmentStatistics().subscribe({
        next: (stats) => {
          this.assignmentStats = stats
          resolve()
        },
        error: (err) => {
          this.notificationService.error("Failed to load assignment statistics")
          reject(err)
        },
      })
    })
  }

  generateReport(): void {
    this.notificationService.info("Report generation is coming soon!")
  }
}
