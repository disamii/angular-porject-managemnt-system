import { Component, Input, type OnInit, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSliderModule } from "@angular/material/slider"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatTabsModule } from "@angular/material/tabs"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"

import type { ScoreResponse } from "../../models/score.model"

@Component({
  selector: "app-criterion-score-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <mat-card class="criterion-card" [ngClass]="scoreForm.get('awardedScore')?.value > 0 ? 'scored' : 'not-scored'">
      <mat-card-header>
        <mat-card-title class="criterion-header">
          <span class="criterion-name">{{ criterion.criteriaName }}</span>
          <span class="criterion-max-score">Max Score: {{ criterion.maxScore }}</span>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="scoreForm" (ngSubmit)="onSubmit()">
          <!-- Score slider -->
          <div class="mt-4">
            <mat-label>Score</mat-label>
            <mat-slider
              class="score-slider w-full"
              [max]="criterion.maxScore"
              [min]="0"
              [step]="1"
              [discrete]="true"
              [showTickMarks]="true">
              <input 
                matSliderThumb
                formControlName="awardedScore"
                (change)="onScoreChange($event)">
            </mat-slider>
            <div class="score-value" [style.color]="getScoreColor(scoreForm.get('awardedScore')?.value, criterion.maxScore)">
              {{ scoreForm.get('awardedScore')?.value || 0 }}
              <span class="score-max">/ {{ criterion.maxScore }}</span>
            </div>
          </div>

          <!-- Feedback tabs -->
          <mat-tab-group class="feedback-tabs mt-4">
            <mat-tab label="Comments">
              <mat-form-field class="w-full mt-4">
                <mat-label>Comments</mat-label>
                <textarea
                  matInput
                  formControlName="comments"
                  rows="4"
                  placeholder="Enter your comments here..."></textarea>
                <mat-hint align="end">
                  {{ scoreForm.get('comments')?.value?.length || 0 }}/1000
                </mat-hint>
                <mat-error *ngIf="scoreForm.get('comments')?.hasError('maxlength')">
                  Comments cannot exceed 1000 characters
                </mat-error>
              </mat-form-field>
            </mat-tab>
            <mat-tab label="Strengths" *ngIf="showDetailedFeedback">
              <mat-form-field class="w-full mt-4">
                <mat-label>Strengths</mat-label>
                <textarea
                  matInput
                  formControlName="strengths"
                  rows="4"
                  placeholder="Enter strengths here..."></textarea>
              </mat-form-field>
            </mat-tab>
            <mat-tab label="Weaknesses" *ngIf="showDetailedFeedback">
              <mat-form-field class="w-full mt-4">
                <mat-label>Weaknesses</mat-label>
                <textarea
                  matInput
                  formControlName="weaknesses"
                  rows="4"
                  placeholder="Enter weaknesses here..."></textarea>
              </mat-form-field>
            </mat-tab>
          </mat-tab-group>
          
          <!-- Condition met checkbox -->
          <div class="mt-4" *ngIf="criterion.conditionMet">
            <mat-checkbox 
              formControlName="conditionMet">
              Condition Met: {{ criterion.conditionMet }}
            </mat-checkbox>
          </div>

          <!-- Save button -->
          <div class="flex justify-end mt-4">
            <button 
              mat-raised-button 
              color="primary" 
              type="submit"
              [disabled]="scoreForm.invalid || scoreForm.pristine">
              <mat-icon>save</mat-icon>
              Save Score
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
    .criterion-card {
      margin-bottom: 16px;
      border-left: 4px solid #ccc;
      transition: all 0.3s ease;
    }
    
    .criterion-card.scored {
      border-left-color: #4caf50;
    }
    
    .criterion-card.not-scored {
      border-left-color: #f44336;
    }
    
    .criterion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    
    .criterion-name {
      font-weight: 500;
    }
    
    .criterion-max-score {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
    }
    
    .score-value {
      font-size: 18px;
      font-weight: 500;
      text-align: right;
    }
    
    .score-max {
      font-size: 14px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.6);
    }
  `,
  ],
})
export class CriterionScoreFormComponent implements OnInit {
  @Input() criterion!: ScoreResponse
  @Input() showDetailedFeedback = false
  @Output() scoreChanged = new EventEmitter<any>()

  scoreForm!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.scoreForm = this.fb.group({
      criteriaId: [this.criterion.criteriaId],
      awardedScore: [
        this.criterion.awardedScore,
        [Validators.required, Validators.min(0), Validators.max(this.criterion.maxScore)],
      ],
      comments: [this.criterion.comments, [Validators.maxLength(1000)]],
      conditionMet: [this.criterion.conditionMet],
      // strengths: [this.criterion.strengths || ""],
      // weaknesses: [this.criterion.weaknesses || ""],
    })
  }

  onScoreChange(event: any): void {
    // Emit score change event for auto-save functionality
    this.scoreChanged.emit({
      criteriaId: this.criterion.criteriaId,
      value: this.scoreForm.value,
    })
  }

  onSubmit(): void {
    if (this.scoreForm.valid) {
      this.scoreChanged.emit({
        criteriaId: this.criterion.criteriaId,
        value: this.scoreForm.value,
        saveNow: true,
      })
    }
  }

  getScoreColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100

    if (percentage >= 80) {
      return "#4caf50" // green
    } else if (percentage >= 50) {
      return "#ff9800" // amber
    } else {
      return "#f44336" // red
    }
  }
}
