import { Component, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatProgressBarModule } from "@angular/material/progress-bar"

@Component({
  selector: "app-evaluation-progress-widget",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  template: `
    <mat-card class="border-0 shadow-md h-full">
      <mat-card-content class="p-6">
        <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
        
        <div class="space-y-4">
          <ng-content></ng-content>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class EvaluationProgressWidgetComponent implements OnInit {
  @Input() title = "Progress"

  constructor() {}

  ngOnInit(): void {}
}
