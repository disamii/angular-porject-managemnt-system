import { Component, Inject, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatDialogModule,  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatSliderModule } from "@angular/material/slider"
import { MatIconModule } from "@angular/material/icon"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDividerModule } from "@angular/material/divider"

import  { EvaluationRubricResponse } from "../../models/evaluation-rubrics.model"

export interface AddEditRubricDialogData {
  rubric?: EvaluationRubricResponse
  isEdit: boolean
}

@Component({
  selector: "app-add-edit-rubric-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: "./add-edit-rubric-dialog.component.html",
})
export class AddEditRubricDialogComponent implements OnInit {
  rubricForm!: FormGroup
  dialogTitle: string
  submitButtonText: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditRubricDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditRubricDialogData
  ) {
    this.dialogTitle = data.isEdit ? "Edit Rubric" : "Create New Rubric";
    this.submitButtonText = data.isEdit ? "Update" : "Create";

    this.rubricForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      documentPassingScore: [70, [Validators.required, Validators.min(0), Validators.max(100)]],
      presentationPassingScore: [70, [Validators.required, Validators.min(0), Validators.max(100)]],
      status: ["DRAFT"]
    });
  }

  ngOnInit(): void {
    if (this.data.rubric) {
      this.rubricForm.patchValue({
        name: this.data.rubric.name,
        description: this.data.rubric.description,
        documentPassingScore: this.data.rubric.documentPassingScore,
        presentationPassingScore: this.data.rubric.presentationPassingScore,
        status: this.data.rubric.status,
      })
    }
  }

  onSubmit(): void {
    if (this.rubricForm.invalid) {
      return
    }

    const formValue = this.rubricForm.value

    if (this.data.isEdit && this.data.rubric) {
      const updateRequest = {
        name: formValue.name,
        description: formValue.description,
        documentPassingScore: formValue.documentPassingScore,
        presentationPassingScore: formValue.presentationPassingScore,
        status: formValue.status,
      }
      this.dialogRef.close(updateRequest)
    } else {
      const createRequest = {
        name: formValue.name,
        description: formValue.description,
        documentPassingScore: formValue.documentPassingScore,
        presentationPassingScore: formValue.presentationPassingScore,
        sections: [],
      }
      this.dialogRef.close(createRequest)
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
