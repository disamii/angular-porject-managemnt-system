import { Component, Inject, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatIconModule } from "@angular/material/icon"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatChipsModule } from "@angular/material/chips"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import type { EvaluatorRequest, EvaluatorResponse } from "../../models/evaluator.model"

export interface AddEditEvaluatorDialogData {
  evaluator?: EvaluatorResponse
  isEdit: boolean
}

@Component({
  selector: "app-add-edit-evaluator-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
  templateUrl: "./add-edit-evaluator-dialog.component.html",
})
export class AddEditEvaluatorDialogComponent implements OnInit {
  evaluatorForm: FormGroup
  dialogTitle: string
  submitButtonText: string

  evaluatorTypes = [
    { value: "INTERNAL", label: "Internal" },
    { value: "EXTERNAL", label: "External" },
    { value: "SUBJECT_MATTER_EXPERT", label: "Subject Matter Expert" },
  ]

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditEvaluatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditEvaluatorDialogData
  ) {
    this.dialogTitle = data.isEdit ? "Edit Evaluator" : "Add New Evaluator"
    this.submitButtonText = data.isEdit ? "Update" : "Create"

    this.evaluatorForm = this.fb.group({
      evaluatorName: ["", [Validators.required, Validators.maxLength(100)]],
      userId: [null, Validators.required],
      maxAssignments: [1, [Validators.required, Validators.min(1)]],
      expertise: [[], Validators.required],
      type: ["DOCUMENT_REVIEWER", Validators.required],  // Fixed type as DOCUMENT_REVIEWER
    })
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    if (this.data.evaluator) {
      this.evaluatorForm.patchValue({
        evaluatorName: this.data.evaluator.evaluatorName,
        userId: this.data.evaluator.evaluator.id,  // Ensure userId is patched
        maxAssignments: this.data.evaluator.maxAssignments,
        expertise: this.data.evaluator.expertise,
        type: this.data.evaluator.type,
      })
    }
  }

  onSubmit(): void {
    if (this.evaluatorForm.invalid) {
      return
    }

    const formValue = this.evaluatorForm.value

    if (this.data.isEdit && this.data.evaluator) {
      const updateRequest: EvaluatorRequest = {
        evaluatorName: formValue.evaluatorName,
        userId: formValue.userId,
        maxAssignments: formValue.maxAssignments,
        expertise: formValue.expertise,
        type: formValue.type,
      }
      this.dialogRef.close(updateRequest)
    } else {
      const createRequest: EvaluatorRequest = {
        evaluatorName: formValue.evaluatorName,
        userId: formValue.userId,
        maxAssignments: formValue.maxAssignments,
        expertise: formValue.expertise,
        type: formValue.type,
      }
      this.dialogRef.close(createRequest)
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
