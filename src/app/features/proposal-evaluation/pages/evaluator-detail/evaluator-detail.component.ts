import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  ActivatedRoute,  Router, RouterModule } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatTabsModule } from "@angular/material/tabs"
import { MatChipsModule } from "@angular/material/chips"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSortModule } from "@angular/material/sort"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatDividerModule } from "@angular/material/divider"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import { MatBadgeModule } from "@angular/material/badge"

import { Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"

import  { EvaluatorService } from "../../services/evaluator.service"
import { AddEditEvaluatorDialogComponent } from "../../components/add-edit-evaluator-dialog/add-edit-evaluator-dialog.component"
import  { EvaluatorResponse,  } from "../../models/evaluator.model"
import  { NotificationService } from "../../services/notification.service"
import { ConfirmDialogComponent } from "../../../../components/confirm-dialog/confirm-dialog.component"

@Component({
  selector: "app-evaluator-detail",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
    MatBadgeModule,
  ],
  templateUrl: "./evaluator-detail.component.html",
  styleUrls: ["./evaluator-detail.component.scss"],
})
export class EvaluatorDetailComponent implements OnInit, OnDestroy {
  evaluatorId!: string
  evaluator!: EvaluatorResponse
  loading = true
  error = false

  // Table columns for assignments
  assignmentColumns: string[] = ["proposalTitle", "status", "assignedDate", "dueDate", "completedDate", "actions"]

  private destroy$ = new Subject<void>()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluatorService: EvaluatorService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.evaluatorId = this.route.snapshot.paramMap.get("id")!
    this.loadEvaluator()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  loadEvaluator(): void {
    this.loading = true
    this.error = false

    this.evaluatorService
      .getEvaluator(this.evaluatorId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (evaluator) => {
          this.evaluator = evaluator!
        },
        error: (err) => {
          this.error = true
          this.loading = false
          this.notificationService.error("Failed to load evaluator details")
          console.log(err)
        },
      })
  }



  editEvaluator(): void {
    const dialogRef = this.dialog.open(AddEditEvaluatorDialogComponent, {
      width: "600px",
      data: {
        mode: "edit",
        evaluator: {
          id: this.evaluator.publicId,
          name: this.evaluator.evaluator.name,
          email: this.evaluator.evaluator.email,
          organization: this.evaluator.evaluator.academicDegreeLevel,
          type: this.evaluator.type,
          expertise: this.evaluator.expertise,
        },
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.evaluatorService
          .updateEvaluator(this.evaluatorId, result)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.notificationService.success("Evaluator updated successfully")
              this.loadEvaluator()
            },
            error: (err) => {
              this.notificationService.error("Failed to update evaluator")
            },
          })
      }
    })
  }



  deleteEvaluator(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Evaluator",
        message: "Are you sure you want to delete this evaluator? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmColor: "warn",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.evaluatorService
          .deleteEvaluator(this.evaluatorId)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.notificationService.success("Evaluator deleted successfully")
              this.router.navigate(["/evaluation/evaluators"])
            },
            error: (err) => {
              this.notificationService.error("Failed to delete evaluator")
            },
          })
      }
    })
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "COMPLETED":
        return "green"
      case "IN_PROGRESS":
        return "orange"
      case "NOT_STARTED":
        return "gray"
      default:
        return "gray"
    }
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case "INTERNAL":
        return "Internal"
      case "EXTERNAL":
        return "External"
      case "SUBJECT_MATTER_EXPERT":
        return "Subject Matter Expert"
      default:
        return type
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case "INTERNAL":
        return "primary"
      case "EXTERNAL":
        return "accent"
      case "SUBJECT_MATTER_EXPERT":
        return "warn"
      default:
        return ""
    }
  }

  viewAssignment(assignmentId: string): void {
    this.router.navigate(["/evaluation/assignments", assignmentId])
  }

  goBack(): void {
    this.router.navigate(["/evaluation/evaluators"])
  }
}
