import { Component, Input, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MilestoneService } from '../../services/milestone.service';
import { Milestone } from '../../models/milestone.model';

@Component({
  selector: 'app-milestone-form',
  templateUrl: './milestone-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
})
export class MilestoneFormComponent implements OnInit {
  @Input() projectId!: number;
  @Input() milestone?: Milestone;
  @Input() isEditing = false;

  milestoneForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private milestoneService: MilestoneService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    @Optional() private dialogRef: MatDialogRef<MilestoneFormComponent>
  ) {}

  ngOnInit(): void {
    // If opened via dialog, use data from the dialog
    if (this.dialogData) {
      this.projectId = this.dialogData.projectId;
      this.milestone = this.dialogData.milestone;
      this.isEditing = this.dialogData.isEditing;
    }

    this.milestoneForm = this.fb.group({
      name: [this.milestone?.name || '', Validators.required],
      description: [this.milestone?.description || '', Validators.required],
      status: [this.milestone?.status || 'NOT_STARTED', Validators.required],
      budget: [this.milestone?.budget || 0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.milestoneForm.invalid) return;

    this.isSubmitting = true;
    const formData = this.milestoneForm.value;

    if (this.isEditing && this.milestone) {
      this.milestoneService.updateMilestone(this.projectId,this.milestone.id, formData).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          alert('Milestone updated successfully!');
          this.dialogRef?.close(formData); // for dialog use
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.isSubmitting = false;
        },
      });
    } else {
      this.milestoneService.createMilestone(this.projectId, formData).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          alert('Milestone created successfully!');
          this.milestoneForm.reset();
          this.dialogRef?.close(formData); // for dialog use
        },
        error: (err) => {
          console.error('Create failed:', err);
          this.isSubmitting = false;
        },
      });
    }
  }
}
