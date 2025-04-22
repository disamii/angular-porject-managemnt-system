import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliverableService } from '../../services/deliverable.service';
import { Deliverable } from '../../models/deliverable.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-milestone-deliverable-form',
  templateUrl: './milestone-deliverable-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatOptionModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class MilestoneDeliverableFormComponent implements OnInit {
  @Input() milestoneId!: number;
  deliverableForm!: FormGroup;
  isSubmitting = false;
  isModalOpen = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { milestoneId: number },
    private dialogRef: MatDialogRef<MilestoneDeliverableFormComponent>,
    private fb: FormBuilder, private deliverableService: DeliverableService) {}

  ngOnInit(): void {
    this.deliverableForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      reviewed: [false],
    });
  }

  onSubmit(): void {
    if (this.deliverableForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const deliverable: Deliverable = {
      id: 0, // Assuming the backend will assign the ID
      name: this.deliverableForm.get('name')?.value,
      description: this.deliverableForm.get('description')?.value,
      milestone: {
        id: this.milestoneId,
        name: '', // You can fetch the milestone name if needed
        status: 'NOT_STARTED', // Assuming a default status
      },
      reviewed: this.deliverableForm.get('reviewed')?.value,
    };

    this.deliverableService.createDeliverable(this.milestoneId, deliverable).subscribe({
      next: (createdDeliverable) => {
        console.log('Deliverable created:', createdDeliverable);
        this.isSubmitting = false;
        this.deliverableForm.reset();
        alert('Deliverable added successfully!');
      },
      error: (err) => {
        console.error('Failed to create deliverable', err);
        this.isSubmitting = false;
      },
    });
  }
 
  closeModal() {
    this.isModalOpen = false;
    this.dialogRef.close('refresh');
  }
}
