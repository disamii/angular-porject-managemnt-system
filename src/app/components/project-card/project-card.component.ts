import { Component, Input } from "@angular/core";
import type { Project } from "../../models/project.model";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
})
export class ProjectCardComponent {
  @Input() project!: Project;

  getProgressColorClass(): string {
    const progress = this.calculateProgress();
    if (progress >= 75) {
      return "bg-emerald-500";
    } else if (progress >= 50) {
      return "bg-blue-500";
    } else {
      return "bg-amber-500";
    }
  }

  getBadgeColorClass(): string {
    const progress = this.calculateProgress();
    if (progress >= 75) {
      return "bg-emerald-100 text-emerald-700";
    } else if (progress >= 50) {
      return "bg-blue-100 text-blue-700";
    } else {
      return "bg-amber-100 text-amber-700";
    }
  }

  calculateProgress(): number {
    if (this.project.milestones.length > 0) {
      const completedMilestones = this.project.milestones.filter(m => m.status === 'COMPLETED').length;
      return (completedMilestones / this.project.milestones.length) * 100;
    }
    return 0;
  }

  getCompletedMilestonesCount(): number {
    return this.project.milestones.filter(m => m.status === 'COMPLETED').length;
  }
}
