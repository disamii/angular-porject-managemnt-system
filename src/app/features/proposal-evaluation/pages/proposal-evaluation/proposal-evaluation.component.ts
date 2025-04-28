import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  ActivatedRoute, Router, RouterModule } from "@angular/router"
import {  FormBuilder, type FormGroup, type FormArray, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { MatSliderModule } from "@angular/material/slider"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatChipsModule } from "@angular/material/chips"
import { MatTabsModule } from "@angular/material/tabs"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatDividerModule } from "@angular/material/divider"
import { MatExpansionModule } from "@angular/material/expansion"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"

import  { EvaluatorDashboardService } from "../../services/evaluator-dashboard.service"
import  { NotificationService } from "../../../project/services/notification.service"
import  { Assignment, AssignmentSubmission, ScoreSubmission } from "../../models/evaluator-dashboard.model"
import { ConfirmDialogComponent } from "../../../../components/confirm-dialog/confirm-dialog.component"

import { Subject } from "rxjs"
import { takeUntil, debounceTime, distinctUntilChanged } from "rxjs/operators"

@Component({
  selector: "app-proposal-evaluation",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatExpansionModule,
    MatSlideToggleModule,
  ],
  templateUrl: "./proposal-evaluation.component.html",
})
export class ProposalEvaluationComponent implements OnInit, OnDestroy {
  assignmentId!: number
  assignment: Assignment | null = null
  loading = true
  submitting = false
  saving = false

  evaluationForm!: FormGroup
  pdfUrl: SafeResourceUrl | null = null
  showPdfPanel = true

  private destroy$ = new Subject<void>()
  private autoSave$ = new Subject<void>()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dashboardService: EvaluatorDashboardService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params.get("id")
      if (id) {
        this.assignmentId = +id
        this.loadAssignment()
      } else {
        this.notificationService.error("Assignment ID is missing")
        this.router.navigate(["/evaluation/evaluator-dashboard"])
      }
    })

    // Set up auto-save
    this.autoSave$
      .pipe(
        debounceTime(5000), // Save after 5 seconds of inactivity
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.saveProgress()
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  loadAssignment(): void {
    this.loading = true
    this.dashboardService.getAssignment(this.assignmentId).subscribe({
      next: (assignment) => {
        if (assignment) {
          this.assignment = assignment

          // Create safe URL for PDF
          if (assignment.proposal.documentUrl) {
            this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(assignment.proposal.documentUrl)
          }

          this.initForm()
          this.loading = false
        } else {
          this.notificationService.error("Assignment not found")
          this.router.navigate(["/evaluation/evaluator-dashboard"])
        }
      },
      error: (error) => {
        this.notificationService.error("Failed to load assignment")
        console.error("Error loading assignment:", error)
        this.loading = false
        this.router.navigate(["/evaluation/evaluator-dashboard"])
      },
    })
  }

  initForm(): void {
    if (!this.assignment) return

    // Create form groups for each criterion
    const criteriaControls = this.assignment.scores.map((score) => {
      return this.fb.group({
        criterionId: [score.criterionId],
        criterionName: [score.criterionName],
        maxScore: [score.maxScore],
        scoreType: [score.scoreType],
        awardedScore: [score.awardedScore, [Validators.required, Validators.min(0), Validators.max(score.maxScore)]],
        comments: [score.comments, [Validators.maxLength(1000)]],
        conditionDescription: [score.conditionDescription || ""],
        conditionMet: [score.conditionMet || false],
      })
    })

    this.evaluationForm = this.fb.group({
      criteria: this.fb.array(criteriaControls),
    })

    // Listen for form changes to trigger auto-save
    this.evaluationForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.autoSave$.next()
    })
  }

  get criteriaFormArray(): FormArray {
    return this.evaluationForm.get("criteria") as FormArray
  }

  togglePdfPanel(): void {
    this.showPdfPanel = !this.showPdfPanel
  }

  saveProgress(): void {
    if (this.evaluationForm.invalid || !this.assignment) return

    this.saving = true

    const submission: AssignmentSubmission = {
      assignmentId: this.assignmentId,
      scores: this.prepareScoreSubmission(),
    }

    this.dashboardService.saveEvaluationProgress(submission).subscribe({
      next: (updatedAssignment) => {
        this.assignment = updatedAssignment
        this.saving = false
        this.notificationService.success("Progress saved")
      },
      error: (error) => {
        this.saving = false
        this.notificationService.error("Failed to save progress")
        console.error("Error saving progress:", error)
      },
    })
  }

  submitEvaluation(): void {
    if (this.evaluationForm.invalid || !this.assignment) {
      this.notificationService.warning("Please complete all required fields")
      this.markAllAsTouched()
      return
    }

    // Check if all criteria have scores
    const hasAllScores = this.criteriaFormArray.controls.every((control) => control.get("awardedScore")?.value > 0)

    if (!hasAllScores) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: "400px",
        data: {
          title: "Incomplete Evaluation",
          message: "Some criteria don't have scores. Are you sure you want to submit this evaluation?",
          confirmText: "Submit Anyway",
          cancelText: "Cancel",
          confirmColor: "warn",
        },
      })

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.performSubmission()
        }
      })
    } else {
      this.performSubmission()
    }
  }

  private performSubmission(): void {
    if (!this.assignment) return

    this.submitting = true

    const submission: AssignmentSubmission = {
      assignmentId: this.assignmentId,
      scores: this.prepareScoreSubmission(),
    }

    this.dashboardService.submitEvaluation(submission).subscribe({
      next: (updatedAssignment) => {
        this.assignment = updatedAssignment
        this.submitting = false
        this.notificationService.success("Evaluation submitted successfully")

        // Navigate back to dashboard after a short delay
        setTimeout(() => {
          this.router.navigate(["/evaluation/evaluator-dashboard"])
        }, 1500)
      },
      error: (error) => {
        this.submitting = false
        this.notificationService.error("Failed to submit evaluation")
        console.error("Error submitting evaluation:", error)
      },
    })
  }

  private prepareScoreSubmission(): ScoreSubmission[] {
    return this.criteriaFormArray.controls.map((control) => {
      const formGroup = control as FormGroup
      const submission: ScoreSubmission = {
        criterionId: formGroup.get("criterionId")?.value,
        awardedScore: formGroup.get("awardedScore")?.value,
        comments: formGroup.get("comments")?.value,
      }

      // Only include conditionMet if the criterion has a condition
      if (formGroup.get("conditionDescription")?.value) {
        submission.conditionMet = formGroup.get("conditionMet")?.value
      }

      return submission
    })
  }

  calculateProgress(): number {
    if (!this.assignment || !this.assignment.scores || this.assignment.scores.length === 0) {
      return 0
    }

    const scoredCriteria = this.assignment.scores.filter((score) => score.awardedScore > 0).length
    return Math.round((scoredCriteria / this.assignment.scores.length) * 100)
  }

  getScoreColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100

    if (percentage >= 80) {
      return "green"
    } else if (percentage >= 50) {
      return "orange"
    } else {
      return "red"
    }
  }

  private markAllAsTouched(): void {
    this.criteriaFormArray.controls.forEach((control) => {
      ;(control as FormGroup).markAllAsTouched()
    })
  }
}
