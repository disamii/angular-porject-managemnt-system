import { Component, Inject, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule,  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatDividerModule } from "@angular/material/divider"
import { MatIconModule } from "@angular/material/icon"
import { MatTooltipModule } from "@angular/material/tooltip"
import  { EvaluationRubricService } from "../../services/evaluation-rubric.service"
import  { EvaluatorService } from "../../services/evaluator.service"
import  { EvaluationAssignmentService } from "../../services/evaluation-assignment.service"
import  { EvaluationRubricResponse } from "../../models/evaluation-rubrics.model"
import  { EvaluatorResponse } from "../../models/evaluator.model"
import  { AssignmentRequest, AssignmentResponse } from "../../models/assignment.model"
import { forkJoin } from "rxjs"
import  { NotificationService } from "../../../project/services/notification.service"

@Component({
  selector: "app-add-edit-assignment-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: "./add-edit-assignment-dialog.component.html",
})
export class AddEditAssignmentDialogComponent implements OnInit {
  assignmentForm!: FormGroup
  loading = false
  submitting = false

  // Data for dropdowns
  rubrics: EvaluationRubricResponse[] = []
  evaluators: EvaluatorResponse[] = []
  proposals: any[] = [] // Mock data for proposals

  // For edit mode
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditAssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { assignment?: AssignmentResponse },
    private rubricService: EvaluationRubricService,
    private evaluatorService: EvaluatorService,
    private assignmentService: EvaluationAssignmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.loadData()

    // Check if we're in edit mode
    this.isEditMode = !!this.data?.assignment
    if (this.isEditMode) {
      this.patchFormWithExistingData()
    }
  }

  private initForm(): void {
    this.assignmentForm = this.fb.group({
      proposalPublicId: ["", Validators.required],
      evaluatorPublicId: ["", Validators.required],
      rubricPublicId: ["", Validators.required],
      dueDate: [new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), Validators.required], // Default to 2 weeks from now
      notes: [""],
    })
  }

  private loadData(): void {
    this.loading = true

    // Load rubrics and evaluators in parallel
    forkJoin({
      rubrics: this.rubricService.getAllRubrics(),
      evaluators: this.evaluatorService.getEvaluators(),
    }).subscribe({
      next: (result) => {
        this.rubrics = result.rubrics.filter((r) => r.status === "ACTIVE")
        this.evaluators = result.evaluators.filter((e) => e.isActive)

        // Mock data for proposals
        this.proposals = [
          { publicId: "proposal-1", title: "Research Grant Proposal" },
          { publicId: "proposal-2", title: "Technology Innovation Project" },
          { publicId: "proposal-3", title: "Community Development Initiative" },
          { publicId: "proposal-4", title: "Educational Program Expansion" },
          { publicId: "proposal-5", title: "Healthcare Improvement Proposal" },
        ]

        this.loading = false
      },
      error: (error) => {
        this.notificationService.error("Failed to load form data")
        this.loading = false
      },
    })
  }
  private patchFormWithExistingData(): void {
    if (this.data?.assignment && this.assignmentForm) {
      this.assignmentForm.patchValue({
        proposalPublicId: "proposal-1", // This would come from the actual assignment
        evaluatorPublicId: this.data.assignment.evaluatorPublicId || "",
        rubricPublicId: this.data.assignment.rubricPublicId || "",
        dueDate: this.data.assignment.dueDate ? new Date(this.data.assignment.dueDate) : new Date(),
        notes: this.data.assignment.notes || "",
      })
    }
  }

  onSubmit(): void {
    if (this.assignmentForm?.invalid) {
      //Object is possibly 'undefined'.
      this.assignmentForm.markAllAsTouched() //Object is possibly 'undefined'.
      return
    }

    this.submitting = true
    const formData = this.assignmentForm?.value //Object is possibly 'undefined'.

    if (this.isEditMode) {
      // Update existing assignment
      this.assignmentService.updateAssignment(this.data.assignment!.publicId, formData).subscribe({
        next: (result) => {
          this.notificationService.success("Assignment updated successfully")
          this.dialogRef.close(result)
          this.submitting = false
        },
        error: (error) => {
          this.notificationService.error("Failed to update assignment")
          this.submitting = false
        },
      })
    } else {
      // Create new assignment
      const newAssignment: AssignmentRequest = {
        proposalPublicId: formData.proposalPublicId,
        evaluatorPublicId: formData.evaluatorPublicId,
        rubricPublicId: formData.rubricPublicId,
        dueDate: formData.dueDate,
        notes: formData.notes,
      }

      this.assignmentService.createAssignment(newAssignment).subscribe({
        next: (result) => {
          this.notificationService.success("Assignment created successfully")
          this.dialogRef.close(result)
          this.submitting = false
        },
        error: (error) => {
          this.notificationService.error("Failed to create assignment")
          this.submitting = false
        },
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  // Helper method to check if a control has errors
  hasError(controlName: string, errorName: string): boolean {
    const control = this.assignmentForm?.get(controlName)
    return !!(control?.touched && control?.hasError(errorName)) // Use !! to convert to boolean
  }
}
