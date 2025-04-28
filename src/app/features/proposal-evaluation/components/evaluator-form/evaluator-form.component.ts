import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatChipsModule } from "@angular/material/chips"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { COMMA, ENTER } from "@angular/cdk/keycodes"
import type { MatChipInputEvent } from "@angular/material/chips"
import type { EvaluatorRequest } from "../../models/evaluator.model"
import { PersonService } from "../../services/person.service"
import { Person } from "../../models/person.model"

@Component({
  selector: "app-evaluator-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
<form [formGroup]="evaluatorForm" (ngSubmit)="onSubmit()">
  <mat-card class="mb-4">
    <mat-card-content class="p-6">
      <h2 class="text-xl font-bold mb-4">{{ isEditMode ? 'Edit Evaluator' : 'Add New Evaluator' }}</h2>

      <!-- 2x2 Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- User Field -->
        <mat-form-field appearance="fill" class="w-full">
          <mat-label>User</mat-label>
          <mat-select formControlName="userId">
            <mat-option *ngFor="let user of users" [value]="user.id">
              {{ user.firstName }} {{ user.lastName }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="evaluatorForm.get('userId')?.hasError('required')">
            User is required
          </mat-error>
        </mat-form-field>

        <!-- Max Assignments Field -->
        <mat-form-field appearance="fill" class="w-full">
          <mat-label>Max Assignments</mat-label>
          <input matInput formControlName="maxAssignments" type="number" placeholder="Enter max assignments">
          <mat-error *ngIf="evaluatorForm.get('maxAssignments')?.hasError('required')">
            Max assignments are required
          </mat-error>
          <mat-error *ngIf="evaluatorForm.get('maxAssignments')?.hasError('min')">
            Max assignments must be a positive number
          </mat-error>
        </mat-form-field>
      </div>

      <!-- 2nd Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Expertise Areas Field -->
        <mat-form-field appearance="fill" class="w-full">
  <mat-label>Expertise</mat-label>
  <input matInput formControlName="expertise" placeholder="Enter expertise area">
  <mat-error *ngIf="evaluatorForm.get('expertise')?.hasError('required')">
    Expertise is required
  </mat-error>
</mat-form-field>


        <!-- Type Field -->
        <mat-form-field appearance="fill" class="w-full">
          <mat-label>Evaluator Type</mat-label>
          <mat-select formControlName="type">
            <mat-option *ngFor="let evaluatorType of evaluatorTypes" [value]="evaluatorType.value">
              {{ evaluatorType.label }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="evaluatorForm.get('type')?.hasError('required')">
            Evaluator type is required
          </mat-error>
        </mat-form-field>
      </div>

    </mat-card-content>
  </mat-card>

  <!-- Submit and Cancel Buttons -->
  <div class="flex justify-end gap-3">
    <button mat-stroked-button type="button" (click)="onCancel()">
      Cancel
    </button>
    <button 
      mat-flat-button 
      color="primary" 
      type="submit" 
      [disabled]="evaluatorForm.invalid"
      class="bg-gradient-to-r from-purple-600 to-indigo-600">
      {{ isEditMode ? 'Update' : 'Create' }}
    </button>
  </div>
</form>

  `,
})
export class EvaluatorFormComponent implements OnInit {
  @Input() evaluator?: EvaluatorRequest
  @Input() isEditMode = false
  @Output() save = new EventEmitter<EvaluatorRequest>()
  @Output() cancel = new EventEmitter<void>()

  evaluatorForm!: FormGroup
  users: Person[] = []  // List of users
  readonly separatorKeysCodes = [ENTER, COMMA] as const
  evaluatorTypes= [
    { value: "DOCUMENT_REVIEWER", label: "Document Reviewer" },
    { value: "PRESENTATION_REVIEWER", label: "Presentation Reviewer" },
  ];

  constructor(private fb: FormBuilder, private userService: PersonService) {}

  ngOnInit(): void {
    this.initForm()

    if (this.evaluator) {
      this.patchForm()
    }

    // Fetch users list to populate user selection
    this.userService.getPeople().subscribe(users => {
      console.log('Fetched users:', users)

      this.users = users
    })
  }

  private initForm(): void {
    this.evaluatorForm = this.fb.group({
      userId: [null, Validators.required],
      maxAssignments: [1, [Validators.required, Validators.min(1)]],
      expertise: [[], Validators.required],
      type: ["", Validators.required],
    })
  }

  private patchForm(): void {
    if (this.evaluator) {
      this.evaluatorForm.patchValue({
        userId: this.evaluator.userId,
        expertise:this.evaluator.expertise,
        maxAssignments: this.evaluator.maxAssignments,
        type: this.evaluator.type,
      })

    }
  }

  

  onSubmit(): void {
    if (this.evaluatorForm.valid) {
      this.save.emit(this.evaluatorForm.value)
    }
  }

  onCancel(): void {
    this.cancel.emit()
  }
}
