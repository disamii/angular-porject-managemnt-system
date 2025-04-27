import { Component, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"

@Component({
  selector: "app-evaluation-activity-widget",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="border-0 shadow-md h-full">
      <mat-card-content class="p-6">
        <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
        
        <div class="space-y-6">
          <ng-content></ng-content>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class EvaluationActivityWidgetComponent implements OnInit {
  @Input() title = "Recent Activity"

  constructor() {}

  ngOnInit(): void {}
}
