import { Component, Inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule,  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { MatDialogModule,  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSliderModule } from "@angular/material/slider"

export interface AddSectionDialogData {
  rubricId: string
  editMode: boolean
  section?: {
    publicId?: string
    title: string
    description: string
    weight: number
    displayOrder: number
  }
}

@Component({
  selector: "app-add-section-dialog",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.editMode ? 'Edit Section' : 'Add New Section' }}</h2>
    <form [formGroup]="sectionForm" (ngSubmit)="onSubmit()">
      <div mat-dialog-content>
        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" placeholder="Enter section title">
          <mat-error *ngIf="sectionForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-full mb-4">
          <mat-label>Description</mat-label>
          <textarea 
            matInput 
            formControlName="description" 
            placeholder="Enter section description"
            rows="3">
          </textarea>
          <mat-error *ngIf="sectionForm.get('description')?.hasError('required')">
            Description is required
          </mat-error>
        </mat-form-field>

        <div class="mb-4">
          <label class="text-sm text-slate-600 mb-2 block">Weight (%): {{ sectionForm.get('weight')?.value }}</label>
          <mat-slider
            min="0"
            max="100"
            step="5"
            class="w-full">
            <input matSliderThumb formControlName="weight">
          </mat-slider>
          <mat-error *ngIf="sectionForm.get('weight')?.hasError('required') || 
                           sectionForm.get('weight')?.hasError('min') || 
                           sectionForm.get('weight')?.hasError('max')" class="text-xs text-red-500">
            Weight must be between 0 and 100
          </mat-error>
        </div>
      </div>

      <div mat-dialog-actions align="end">
        <button mat-button mat-dialog-close type="button">Cancel</button>
        <button 
          mat-flat-button 
          color="primary" 
          type="submit"
          [disabled]="sectionForm.invalid">
          {{ data.editMode ? 'Update' : 'Add' }}
        </button>
      </div>
    </form>
  `,
})
export class AddSectionDialogComponent {
  sectionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddSectionDialogData,
    private fb: FormBuilder
  ) {
    this.sectionForm = this.fb.group({
      title: [data.section?.title || '', Validators.required],
      description: [data.section?.description || '', Validators.required],
      weight: [data.section?.weight || 10, [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.sectionForm.valid) {
      this.dialogRef.close({
        ...this.data.section,
        ...this.sectionForm.value,
      })
    }
  }
}
