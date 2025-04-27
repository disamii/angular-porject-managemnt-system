import { Component, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-assignment-stats-widget",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatIconModule, MatButtonModule, RouterModule],
  template: `
    <mat-card class="border-0 shadow-md h-full">
      <mat-card-content class="p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="h-12 w-12 rounded-full flex items-center justify-center bg-purple-100">
              <mat-icon class="text-purple-600">assignment</mat-icon>
            </div>
            <div>
              <h3 class="text-lg font-bold">Assignment Statistics</h3>
              <p class="text-sm text-slate-500">Overall progress</p>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-slate-50 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-purple-600">{{ stats.totalAssignments }}</div>
            <div class="text-sm text-slate-600">Total</div>
          </div>
          <div class="bg-slate-50 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-green-600">{{ stats.completedAssignments }}</div>
            <div class="text-sm text-slate-600">Completed</div>
          </div>
          <div class="bg-slate-50 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-amber-600">{{ stats.inProgressAssignments }}</div>
            <div class="text-sm text-slate-600">In Progress</div>
          </div>
          <div class="bg-slate-50 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-slate-600">{{ stats.notStartedAssignments }}</div>
            <div class="text-sm text-slate-600">Not Started</div>
          </div>
        </div>
        
        <div class="space-y-4 mb-6">
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium">Completion Rate</span>
              <span class="text-sm font-medium">{{ stats.completionRate.toFixed(1) }}%</span>
            </div>
            <mat-progress-bar 
              mode="determinate" 
              [value]="stats.completionRate" 
              color="primary">
            </mat-progress-bar>
          </div>
          
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium">Average Score</span>
              <span class="text-sm font-medium">{{ stats.averageScore.toFixed(1) }}</span>
            </div>
            <mat-progress-bar 
              mode="determinate" 
              [value]="stats.averageScore" 
              color="accent">
            </mat-progress-bar>
          </div>
        </div>
        
        <div class="flex justify-between items-center text-sm text-slate-600 mb-4">
          <div>{{ stats.uniqueEvaluators }} Evaluators</div>
          <div>{{ stats.uniqueProposals }} Proposals</div>
        </div>
        
        <button mat-stroked-button color="primary" class="w-full" routerLink="/evaluation/assignments">
          View All Assignments
        </button>
      </mat-card-content>
    </mat-card>
  `,
})
export class AssignmentStatsWidgetComponent implements OnInit {
  @Input() stats: any = {
    totalAssignments: 0,
    completedAssignments: 0,
    inProgressAssignments: 0,
    notStartedAssignments: 0,
    completionRate: 0,
    uniqueEvaluators: 0,
    uniqueProposals: 0,
    averageScore: 0,
  }

  constructor() {}

  ngOnInit(): void {}
}
