import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Deliverable } from "../../models/deliverable.model";
import { OnInit, Input, Inject, Component } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { DeliverableService } from "../../services/deliverable.service";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

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
  isEditing = false;
  deliverableToEdit: Deliverable | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { milestoneId: number; deliverable?: Deliverable; isEditing?: boolean },
    private dialogRef: MatDialogRef<MilestoneDeliverableFormComponent>,
    private fb: FormBuilder,
    private deliverableService: DeliverableService
  ) {}

  ngOnInit(): void {
    this.isEditing = !!this.data.isEditing;
    this.deliverableToEdit = this.data.deliverable || null;
    this.milestoneId = this.data.milestoneId;

    this.deliverableForm = this.fb.group({
      name: [this.deliverableToEdit?.name || '', Validators.required],
      description: [this.deliverableToEdit?.description || '', Validators.required],
      reviewed: [this.deliverableToEdit?.reviewed || false],
    });
  }

  onSubmit(): void {
    if (this.deliverableForm.invalid) return;

    this.isSubmitting = true;

    const deliverable: Deliverable = {
      id: this.deliverableToEdit?.id || 0,
      name: this.deliverableForm.value.name,
      description: this.deliverableForm.value.description,
      reviewed: this.deliverableForm.value.reviewed,
      milestone: {
        id: this.milestoneId,
        name: this.deliverableToEdit?.milestone?.name || '',
        status: this.deliverableToEdit?.milestone?.status || 'NOT_STARTED',
      },
    };

    // const request$ = this.isEditing
      // ? this.deliverableService.updateDeliverable(this.milestoneId, deliverable.id, deliverable)
      // : this.deliverableService.createDeliverable(this.milestoneId, deliverable);
      const request$=   this.deliverableService.createDeliverable(this.milestoneId, deliverable);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.deliverableForm.reset();
        alert(this.isEditing ? 'Deliverable updated successfully!' : 'Deliverable created successfully!');
        this.dialogRef.close('refresh');
      },
      error: (err) => {
        console.error('Failed to save deliverable', err);
        this.isSubmitting = false;
      },
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.dialogRef.close('refresh');
  }
}
