import { Component, Inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatDialogModule,  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatSliderModule } from "@angular/material/slider"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatDividerModule } from "@angular/material/divider"

export interface AddCriterionDialogData {
  sectionId: string
  editMode: boolean
  criterion?: {
    id?: number
    publicId?: string
    name: string
    description: string
    maxScore: number
    scoreType: "DIRECT_SCORE"
    condition: string
    conditionMetScore: number
    conditionNotMetScore: number
    phase: "DOCUMENT_REVIEW" | "PRESENTATION_REVIEW"
  }
}

@Component({
  selector: "app-add-criterion-dialog",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  templateUrl: "./add-criterion-dialog-component.html",
})
export class AddCriterionDialogComponent {
  criterionForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCriterionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddCriterionDialogData,
    private fb: FormBuilder
  ) {
    const hasCondition = !!data.criterion?.condition;

    this.criterionForm = this.fb.group({
      name: [data.criterion?.name || '', Validators.required],
      description: [data.criterion?.description || '', Validators.required],
      maxScore: [data.criterion?.maxScore || 10, [Validators.required, Validators.min(1)]],
      phase: [data.criterion?.phase || 'DOCUMENT_REVIEW', Validators.required],
      hasCondition: [hasCondition],
      condition: [data.criterion?.condition || ''],
      conditionMetScore: [data.criterion?.conditionMetScore || 0],
      conditionNotMetScore: [data.criterion?.conditionNotMetScore || 0]
    });

    // Add conditional validation
    const hasConditionControl = this.criterionForm.get('hasCondition');
    if (hasConditionControl) {
      const conditionControl = this.criterionForm.get('condition');
      const metScoreControl = this.criterionForm.get('conditionMetScore');
      const notMetScoreControl = this.criterionForm.get('conditionNotMetScore');
    
      if (conditionControl && metScoreControl && notMetScoreControl) {
        if (hasCondition) {
          conditionControl.setValidators(Validators.required);
          metScoreControl.setValidators([Validators.required]);
          notMetScoreControl.setValidators([Validators.required]);
        } else {
          conditionControl.clearValidators();
          metScoreControl.clearValidators();
          notMetScoreControl.clearValidators();
        }
    
        conditionControl.updateValueAndValidity();
        metScoreControl.updateValueAndValidity();
        notMetScoreControl.updateValueAndValidity();
      }
    }
  }

  // onSubmit method to handle form submission
  onSubmit(): void {
    if (this.criterionForm.valid) {
      const formValue = this.criterionForm.value

      // If no condition, clear condition-related fields
      if (!formValue.hasCondition) {
        formValue.condition = ""
        formValue.conditionMetScore = 0
        formValue.conditionNotMetScore = 0
      }

      // Remove the hasCondition field as it's not part of the model
      delete formValue.hasCondition

      this.dialogRef.close({
        ...this.data.criterion,
        ...formValue,
        scoreType: "DIRECT_SCORE",
      })
    }
  }
}
