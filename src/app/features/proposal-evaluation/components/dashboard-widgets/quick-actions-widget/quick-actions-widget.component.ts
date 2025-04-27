import { Component, Input, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-quick-actions-widget",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div>
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class QuickActionsWidgetComponent implements OnInit {
  @Input() title = "Quick Actions"

  constructor() {}

  ngOnInit(): void {}
}
