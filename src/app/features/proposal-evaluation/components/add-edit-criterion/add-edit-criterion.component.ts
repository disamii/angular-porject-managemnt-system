import { Component, Inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSliderModule } from "@angular/material/slider"

export interface AddEditCriterionDialogData {
  criterion?: {
    name: string
    description: string
    maxScore: number
    scoreType: string
    condition: string
    conditionMetScore: number
    conditionNotMetScore: number
    phase: string
  }
  isEdit: boolean
}

@Component({
  selector: "app-add-edit-criterion-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.isEdit ? 'Edit Criterion' : 'Add New Criterion' }}</h2>
    <form [formGroup]="criterionForm" (ngSubmit)="onSubmit()">
      <div mat-dialog-content>
        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Criterion Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter criterion name">
          <mat-error *ngIf="criterionForm.get('name')?.hasError('required')">
            Criterion name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Enter criterion description" rows="3"></textarea>
          <mat-error *ngIf="criterionForm.get('description')?.hasError('required')">
            Description is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Max Score</mat-label>
          <input matInput formControlName="maxScore" type="number" placeholder="Enter max score">
          <mat-error *ngIf="criterionForm.get('maxScore')?.hasError('required')">
            Max score is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Condition</mat-label>
          <input matInput formControlName="condition" placeholder="Enter condition">
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Condition Met Score</mat-label>
          <input matInput formControlName="conditionMetScore" type="number" placeholder="Condition met score">
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Condition Not Met Score</mat-label>
          <input matInput formControlName="conditionNotMetScore" type="number" placeholder="Condition not met score">
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Phase</mat-label>
          <input matInput formControlName="phase" placeholder="Enter phase">
        </mat-form-field>
      </div>

      <div mat-dialog-actions align="end">
        <button mat-button mat-dialog-close type="button">Cancel</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="criterionForm.invalid">
          {{ data.isEdit ? 'Update' : 'Add' }}
        </button>
      </div>
    </form>
  `,
})
export class AddEditCriterionDialogComponent {
  criterionForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<AddEditCriterionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditCriterionDialogData,
    private fb: FormBuilder
  ) {
    this.criterionForm = this.fb.group({
      name: [data.criterion?.name || "", Validators.required],
      description: [data.criterion?.description || "", Validators.required],
      maxScore: [data.criterion?.maxScore || 0, [Validators.required, Validators.min(0)]],
      condition: [data.criterion?.condition || ""],
      conditionMetScore: [data.criterion?.conditionMetScore || 0],
      conditionNotMetScore: [data.criterion?.conditionNotMetScore || 0],
      phase: [data.criterion?.phase || ""],
    })
  }

  onSubmit(): void {
    if (this.criterionForm.valid) {
      this.dialogRef.close(this.criterionForm.value)
    }
  }
}
