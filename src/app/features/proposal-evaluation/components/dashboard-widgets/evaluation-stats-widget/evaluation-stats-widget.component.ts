import { Component, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatDividerModule } from "@angular/material/divider"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-evaluation-stats-widget",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    RouterModule,
  ],
  template: `
    <mat-card class="border-0 shadow-md h-full">
      <mat-card-content class="p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="h-12 w-12 rounded-full flex items-center justify-center" [ngClass]="iconBgClass">
              <mat-icon [ngClass]="iconTextClass">{{ icon }}</mat-icon>
            </div>
            <div>
              <h3 class="text-lg font-bold">{{ title }}</h3>
              <p class="text-sm text-slate-500">{{ subtitle }}</p>
            </div>
          </div>
          <button mat-icon-button color="primary" [routerLink]="routerLink">
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
        
        <mat-divider></mat-divider>
        
        <div class="mt-4 space-y-3">
          <ng-content></ng-content>
        </div>
        
        <div class="mt-4">
          <button mat-stroked-button color="primary" class="w-full" [routerLink]="routerLink">
            {{ buttonText }}
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class EvaluationStatsWidgetComponent implements OnInit {
  @Input() title = "Widget Title"
  @Input() subtitle = "Widget Subtitle"
  @Input() icon = "dashboard"
  @Input() iconBgClass = "bg-purple-100"
  @Input() iconTextClass = "text-purple-600"
  @Input() routerLink = "/"
  @Input() buttonText = "View All"

  constructor() {}

  ngOnInit(): void {}
}
