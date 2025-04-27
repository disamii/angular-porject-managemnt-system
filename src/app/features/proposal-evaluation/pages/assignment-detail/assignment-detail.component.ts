import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
import { FormsModule, ReactiveFormsModule,  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatTabsModule } from "@angular/material/tabs"
import { MatChipsModule } from "@angular/material/chips"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import { MatExpansionModule } from "@angular/material/expansion"
import { MatTableModule } from "@angular/material/table"

import  { AssignmentResponse, AssignmentUpdateRequest } from "../../models/assignment.model"
import { ConfirmDialogComponent } from "../../../../components/confirm-dialog/confirm-dialog.component"
import  { EvaluationAssignmentService } from "../../services/evaluation-assignment.service"
import  { NotificationService } from "../../services/notification.service"

@Component({
  selector: "app-assignment-detail",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule,
    MatTableModule,
  ],
  templateUrl: "./assignment-detail.component.html",
})
export class AssignmentDetailComponent implements OnInit {
  assignmentId!: string
  assignment!: AssignmentResponse
  loading = true
  editMode = false
  feedbackForm!: FormGroup
  displayedColumns: string[] = ["criteriaName", "awardedScore", "maxScore", "comments"]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private assignmentService: EvaluationAssignmentService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get("id")!
    this.loadAssignment()

    this.feedbackForm = this.fb.group({
      status: ["", Validators.required],
      feedback: ["", Validators.required],
    })
  }

  loadAssignment(): void {
    this.loading = true
    if (this.assignmentId === null) {
      this.notificationService.error("Assignment ID is missing")
      this.loading = false
      return
    }
    this.assignmentService.getAssignment(this.assignmentId).subscribe({
      next: (assignment) => {
        this.assignment = assignment!
        if (this.assignment) {
          this.feedbackForm?.patchValue({
            status: this.assignment.status,
            feedback: "", // Assuming feedback would be stored somewhere in the assignment
          })
        } else {
          this.notificationService.error("Assignment is not available")
        }
        this.loading = false
      },
      error: (err) => {
        this.notificationService.error("Failed to load assignment details")
        this.loading = false
        this.router.navigate(["/evaluation/assignments"])
      },
    })
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode
  }

  saveChanges(): void {
    if (this.feedbackForm?.invalid) {
      this.notificationService.warning("Please fill in all required fields")
      return
    }

    if (this.feedbackForm?.value) {
      const updateRequest: AssignmentUpdateRequest = {
        status: this.feedbackForm.value.status,
        feedback: this.feedbackForm.value.feedback,
      }

      if (this.assignmentId === null) {
        this.notificationService.error("Assignment ID is missing")
        return
      }

      if (!this.assignment) {
        this.notificationService.error("Assignment is not loaded")
        return
      }

      this.assignmentService.updateAssignmentStatus(this.assignmentId, updateRequest).subscribe({
        next: (updatedAssignment) => {
          this.notificationService.success("Assignment updated successfully")
          this.assignment = updatedAssignment!
          this.editMode = false
        },
        error: (err) => {
          this.notificationService.error("Failed to update assignment")
        },
      })
    }
  }
  cancelEdit(): void {
    this.editMode = false
    if (this.assignment) {
      this.feedbackForm?.patchValue({
        status: this.assignment.status,
        feedback: "", // Reset to original value
      })
    }
  }

  deleteAssignment(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Assignment",
        message: "Are you sure you want to delete this assignment? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmColor: "warn",
        icon: "delete",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.assignmentId === null) {
          this.notificationService.error("Assignment ID is missing")
          return
        }
        this.assignmentService.deleteAssignment(this.assignmentId).subscribe({
          next: () => {
            this.notificationService.success("Assignment deleted successfully")
            this.router.navigate(["/evaluation/assignments"])
          },
          error: (err) => {
            this.notificationService.error("Failed to delete assignment")
          },
        })
      }
    })
  }

  submitScores(): void {
    if (this.assignmentId === null) {
      this.notificationService.error("Assignment ID is missing")
      return
    }
    this.router.navigate(["/evaluation/score", this.assignmentId])
  }

  calculateProgress(): number {
    if (!this.assignment || !this.assignment.scores || this.assignment.scores.length === 0) {
      return 0
    }

    const completedScores = this.assignment.scores.filter((score) => score.awardedScore > 0).length
    return Math.round((completedScores / this.assignment.scores.length) * 100)
  }

  getStatusColor(status: string): string {
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
}
