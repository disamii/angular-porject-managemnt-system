import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MilestoneService } from "../../services/milestone.service";

@Component({
  selector: "app-milestone-form",
  templateUrl: "./milestone-form.component.html",
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

  milestoneForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private milestoneService: MilestoneService
  ) {}

  ngOnInit(): void {
    this.milestoneForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      status: ["NOT_STARTED", Validators.required],
      budget: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.milestoneForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const milestoneData = this.milestoneForm.value;

    this.milestoneService.createMilestone(this.projectId, milestoneData)
      .subscribe({
        next: (response) => {
          console.log("Milestone created:", response);
          this.isSubmitting = false;
          this.milestoneForm.reset();
          alert("Milestone added successfully!");
        },
        error: (err) => {
          console.error("Error creating milestone:", err);
          this.isSubmitting = false;
          alert("Failed to add milestone.");
        }
      });
  }
}
