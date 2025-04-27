import { Component, Input, type OnInit, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatChipsModule } from "@angular/material/chips"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatDividerModule } from "@angular/material/divider"
import { COMMA, ENTER } from "@angular/cdk/keycodes"
import type { MatChipInputEvent } from "@angular/material/chips"

import type { EvaluatorResponse } from "../../models/evaluator.model"

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
    MatSlideToggleModule,
    MatDividerModule,
  ],
  template: `
    <form [formGroup]="evaluatorForm" (ngSubmit)="onSubmit()">
      <mat-card class="mb-4">
        <mat-card-content class="p-6">
          <h2 class="text-xl font-bold mb-4">{{ isEditMode ? 'Edit Evaluator' : 'Add New Evaluator' }}</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <mat-form-field appearance="fill" class="w-full">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter evaluator name">
              <mat-error *ngIf="evaluatorForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="fill" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" placeholder="Enter email address">
              <mat-error *ngIf="evaluatorForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="evaluatorForm.get('email')?.hasError('email')">
                Please enter a valid email address
              </mat-error>
            </mat-form-field>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <mat-form-field appearance="fill" class="w-full">
              <mat-label>Organization</mat-label>
              <input matInput formControlName="organization" placeholder="Enter organization">
              <mat-error *ngIf="evaluatorForm.get('organization')?.hasError('required')">
                Organization is required
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="fill" class="w-full">
              <mat-label>Type</mat-label>
              <mat-select formControlName="type">
                <mat-option value="INTERNAL">Internal</mat-option>
                <mat-option value="EXTERNAL">External</mat-option>
                <mat-option value="SUBJECT_MATTER_EXPERT">Subject Matter Expert</mat-option>
              </mat-select>
              <mat-error *ngIf="evaluatorForm.get('type')?.hasError('required')">
                Type is required
              </mat-error>
            </mat-form-field>
          </div>
          
          <mat-form-field appearance="fill" class="w-full">
            <mat-label>Expertise Areas</mat-label>
            <mat-chip-grid #chipGrid formControlName="expertise">
              <mat-chip-row *ngFor="let expertise of expertiseList" (removed)="removeExpertise(expertise)">
                {{expertise}}
                <button matChipRemove>
                  <mat-icon>cancel</mat-icon>
                </button>
              </mat-chip-row>
              <input placeholder="Add expertise..."
                     [matChipInputFor]="chipGrid"
                     [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                     (matChipInputTokenEnd)="addExpertise($event)">
            </mat-chip-grid>
            <mat-error *ngIf="evaluatorForm.get('expertise')?.hasError('required')">
              At least one expertise area is required
            </mat-error>
          </mat-form-field>
          
          <div *ngIf="isEditMode" class="mt-4">
            <mat-slide-toggle formControlName="isActive" color="primary">
              Active
            </mat-slide-toggle>
            <p class="text-sm text-slate-600 mt-1">Inactive evaluators cannot be assigned to new proposals</p>
          </div>
        </mat-card-content>
      </mat-card>
      
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
  @Input() evaluator?: EvaluatorResponse
  @Input() isEditMode = false
  @Output() save = new EventEmitter<any>()
  @Output() cancel = new EventEmitter<void>()

  evaluatorForm!: FormGroup
  expertiseList: string[] = []
  readonly separatorKeysCodes = [ENTER, COMMA] as const

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm()

    if (this.evaluator) {
      this.patchForm()
    }
  }

  private initForm(): void {
    this.evaluatorForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      organization: ["", Validators.required],
      type: ["INTERNAL", Validators.required],
      expertise: [[], Validators.required],
      isActive: [true],
    })
  }

  private patchForm(): void {
    if (this.evaluator) {
      this.evaluatorForm.patchValue({
        name: this.evaluator.name,
        email: this.evaluator.email,
        organization: this.evaluator.organization,
        type: this.evaluator.type,
        isActive: this.evaluator.isActive,
      })

      this.expertiseList = [...this.evaluator.expertise]
      this.evaluatorForm.get("expertise")?.setValue(this.expertiseList)
    }
  }

  addExpertise(event: MatChipInputEvent): void {
    const value = (event.value || "").trim()

    if (value) {
      this.expertiseList.push(value)
      this.evaluatorForm.get("expertise")?.setValue(this.expertiseList)
    }

    event.chipInput!.clear()
  }

  removeExpertise(expertise: string): void {
    const index = this.expertiseList.indexOf(expertise)

    if (index >= 0) {
      this.expertiseList.splice(index, 1)
      this.evaluatorForm.get("expertise")?.setValue(this.expertiseList)
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
