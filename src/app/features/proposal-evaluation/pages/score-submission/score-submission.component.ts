import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute,  Router, RouterModule } from "@angular/router"
import {
   FormBuilder,
   FormGroup,
   FormArray,
   FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { MatSliderModule } from "@angular/material/slider"
import { MatExpansionModule } from "@angular/material/expansion"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatChipsModule } from "@angular/material/chips"
import { MatTabsModule } from "@angular/material/tabs"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

import  { ScoreService } from "../../services/score.service"
import  { EvaluationAssignmentService } from "../../services/evaluation-assignment.service"
import  { ScoreResponse, ScoreSummary, ScoreRequest } from "../../models/score.model"
import  { AssignmentResponse } from "../../models/assignment.model"

import { Subject, type Subscription, debounceTime, distinctUntilChanged, takeUntil } from "rxjs"
import { ConfirmDialogComponent } from "../../../../components/confirm-dialog/confirm-dialog.component"
import { NotificationService } from "../../services/notification.service"
import { CriterionScoreFormComponent } from "../../components/criterion-score-form/criterion-score-form.component"

@Component({
  selector: "app-score-submission",
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
    MatExpansionModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    CriterionScoreFormComponent,
  ],
  templateUrl: "./score-submission.component.html",
  styleUrls: ["./score-submission.component.scss"],
})
export class ScoreSubmissionComponent implements OnInit, OnDestroy {
  assignmentId!: string
  assignment!: AssignmentResponse
  scores: ScoreResponse[] = []
  scoreSummary!: ScoreSummary

  scoreForm!: FormGroup
  criteriaGroups: { [key: string]: ScoreResponse[] } = {}

  loading = true
  submitting = false
  autoSaveStatus = "idle"
  lastSaved: Date | null = null

  private destroy$ = new Subject<void>()
  private formChanges$ = new Subject<{ criteriaId: number; value: any; saveNow?: boolean }>()
  private autoSaveSubscription!: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private scoreService: ScoreService,
    private assignmentService: EvaluationAssignmentService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get("id")!
    this.initForm()
    this.loadData()
    this.setupAutoSave()

    this.scoreService.autoSaveStatus$.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      this.autoSaveStatus = status.status
      if (status.timestamp) {
        this.lastSaved = status.timestamp
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
    if (this.autoSaveSubscription) {
      this.autoSaveSubscription.unsubscribe()
    }
  }

  private initForm(): void {
    this.scoreForm = this.fb.group({
      scores: this.fb.array([]),
    })
  }

  private loadData(): void {
    this.loading = true

    this.assignmentService.getAssignment(this.assignmentId).subscribe({
      next: (assignment) => {
        this.assignment = assignment!

        this.scoreService.getScoresByAssignment(this.assignmentId).subscribe({
          next: (scores) => {
            this.scores = scores
            this.organizeScoresByCriteria()
            this.buildScoreForm()

            this.scoreService.getScoreSummary(this.assignmentId).subscribe({
              next: (summary) => {
                this.scoreSummary = summary!
                this.loading = false
              },
              error: (error) => {
                this.notificationService.error("Failed to load score summary")
                this.loading = false
              },
            })
          },
          error: (error) => {
            this.notificationService.error("Failed to load scores")
            this.loading = false
          },
        })
      },
      error: (error) => {
        this.notificationService.error("Failed to load assignment")
        this.loading = false
      },
    })
  }

  private organizeScoresByCriteria(): void {
    this.criteriaGroups = {}

    this.scores.forEach((score) => {
      const sectionName = score.criteriaName.split(" - ")[0] || "General"
      if (!this.criteriaGroups[sectionName]) {
        this.criteriaGroups[sectionName] = []
      }
      this.criteriaGroups[sectionName].push(score)
    })
  }

  private buildScoreForm(): void {
    const scoresArray = this.scoreForm.get("scores") as FormArray
    scoresArray.clear()

    this.scores.forEach((score) => {
      scoresArray.push(this.createScoreFormGroup(score))
    })
  }

  private createScoreFormGroup(score: ScoreResponse): FormGroup {
    return this.fb.group({
      criteriaId: [score.criteriaId],
      awardedScore: [score.awardedScore, [Validators.required, Validators.min(0), Validators.max(score.maxScore)]],
      comments: [score.comments, [Validators.maxLength(1000)]],
      conditionMet: [score.conditionMet],
      // strengths: [score.strengths || ""],
      // weaknesses: [score.weaknesses || ""],
    })
  }

  getScoredCriteriaCount(section: ScoreResponse[]): number {
    return section.filter((s) => s.awardedScore > 0).length
  }

  getAutoSaveStatusText(): string {
    switch (this.autoSaveStatus) {
      case "saving":
        return "Saving..."
      case "saved":
        return "All changes saved"
      case "error":
        return "Error saving changes"
      default:
        return "Auto-saving enabled"
    }
  }

  private setupAutoSave(): void {
    this.autoSaveSubscription = this.formChanges$
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev.value) === JSON.stringify(curr.value) && !curr.saveNow,
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((change) => {
        this.saveScore(change.criteriaId)
      })
  }

  onScoreChange(event: any): void {
    this.formChanges$.next(event)

    // If saveNow flag is true, save immediately without debounce
    if (event.saveNow) {
      this.saveScore(event.criteriaId)
    }
  }

  saveScore(criteriaId: number): void {
    const scoresArray = this.scoreForm.get("scores") as FormArray
    const scoreGroup = scoresArray.controls.find(
      (control) => (control as FormGroup).get("criteriaId")?.value === criteriaId,
    ) as FormGroup

    if (scoreGroup && scoreGroup.valid) {
      const scoreData: ScoreRequest = {
        assignmentPublicId: Number.parseInt(this.assignmentId),
        criteriaId: criteriaId,
        awardedScore: scoreGroup.get("awardedScore")?.value,
        conditionMet: scoreGroup.get("conditionMet")?.value,
        comments: scoreGroup.get("comments")?.value,
      }

      this.scoreService.saveScore(scoreData).subscribe({
        next: (response) => {
          const index = this.scores.findIndex((s) => s.criteriaId === criteriaId)
          if (index >= 0) {
            this.scores[index] = {
              ...this.scores[index],
              ...response,
            }
          }
          this.refreshScoreSummary()
        },
        error: (error) => {
          this.notificationService.error("Failed to save score")
        },
      })
    }
  }

  saveAllScores(): void {
    if (this.scoreForm.valid) {
      const scoresArray = this.scoreForm.get("scores") as FormArray
      const savePromises = []

      for (let i = 0; i < scoresArray.length; i++) {
        const scoreGroup = scoresArray.at(i) as FormGroup
        const criteriaId = scoreGroup.get("criteriaId")?.value

        savePromises.push(
          this.scoreService
            .saveScore({
              assignmentPublicId: Number.parseInt(this.assignmentId),
              criteriaId: criteriaId,
              awardedScore: scoreGroup.get("awardedScore")?.value,
              conditionMet: scoreGroup.get("conditionMet")?.value,
              comments: scoreGroup.get("comments")?.value,
            })
            .toPromise(),
        )
      }

      Promise.all(savePromises)
        .then(() => {
          this.notificationService.success("All scores saved successfully")
          this.refreshScoreSummary()
        })
        .catch(() => {
          this.notificationService.error("Failed to save some scores")
        })
    } else {
      this.notificationService.warning("Please correct validation errors before saving")
      this.markAllAsTouched()
    }
  }

  submitScores(): void {
    if (this.scoreSummary?.completionPercentage < 100) {
      this.notificationService.warning("Please complete all criteria before submitting")
      return
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Submit Evaluation",
        message:
          "Are you sure you want to submit this evaluation? You will not be able to make changes after submission.",
        confirmText: "Submit",
        cancelText: "Cancel",
        confirmColor: "primary",
        icon: "send",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.submitting = true
        this.saveAllScores()
        this.scoreService
          .submitScores(
            this.scores.map((score) => ({
              assignmentPublicId: Number.parseInt(this.assignmentId),
              criteriaId: score.criteriaId,
              awardedScore: score.awardedScore,
              conditionMet: score.conditionMet,
              comments: score.comments,
            })),
          )
          .subscribe({
            next: () => {
              this.submitting = false
              this.notificationService.success("Scores submitted successfully")
              this.router.navigate(["/evaluation/assignments"])
            },
            error: () => {
              this.submitting = false
              this.notificationService.error("Failed to submit scores")
            },
          })
      }
    })
  }

  getScoreColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100

    if (percentage >= 80) {
      return "green"
    } else if (percentage >= 50) {
      return "yellow"
    } else {
      return "red"
    }
  }

  getScoreControl(criteriaId: number, controlName: string): FormControl {
    const scoresArray = this.scoreForm.get("scores") as FormArray
    const scoreGroup = scoresArray.controls.find(
      (control) => (control as FormGroup).get("criteriaId")?.value === criteriaId,
    ) as FormGroup

    return scoreGroup.get(controlName) as FormControl
  }

  private refreshScoreSummary(): void {
    this.scoreService.getScoreSummary(this.assignmentId).subscribe({
      next: (summary) => {
        this.scoreSummary = summary!
      },
      error: () => {
        this.notificationService.error("Failed to refresh score summary")
      },
    })
  }

  private markAllAsTouched(): void {
    const scoresArray = this.scoreForm.get("scores") as FormArray
    scoresArray.controls.forEach((control) => {
      ;(control as FormGroup).markAllAsTouched()
    })
  }
}
