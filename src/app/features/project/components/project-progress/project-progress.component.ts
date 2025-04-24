import { Component, Input } from "@angular/core"
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-project-progress",
  templateUrl: "./project-progress.component.html",
  imports:[
    CommonModule
  ]
  // styleUrls: ["./project-progress.component.scss"],
})
export class ProjectProgressComponent {
  @Input() progress = 0
  @Input() label = "Progress"
  @Input() showPercentage = true

  getProgressColorClass(): string {
    if (this.progress >= 75) {
      return "bg-emerald-500"
    } else if (this.progress >= 50) {
      return "bg-blue-500"
    } else {
      return "bg-amber-500"
    }
  }
}
