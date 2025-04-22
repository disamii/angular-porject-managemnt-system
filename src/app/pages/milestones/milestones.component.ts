import { Component, OnInit } from "@angular/core";
import type { Milestone } from "../../models/milestone.model";
import { MilestoneService } from "../../services/milestone.service";

import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatChipsModule } from "@angular/material/chips";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatOptionModule } from "@angular/material/core";
import { ProjectService } from "../../services/project.service";

@Component({
  selector: "app-milestones",
  templateUrl: "./milestones.component.html",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatOptionModule
  ],
})



export class MilestonesComponent implements OnInit {
  allMilestones: Milestone[] = [];
  pendingMilestones: Milestone[] = [];
  approvedMilestones: Milestone[] = [];
  searchTerm = "";
  allProjects: any[] = [];
  selectedProjectId: number = 0;
  constructor(
    private projectService: ProjectService,
    private milestoneService: MilestoneService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.allProjects = projects;

      // Automatically select the first project and load its milestones
      if (projects.length > 0) {
        this.selectedProjectId = projects[0].id;
        this.loadMilestones(this.selectedProjectId);
      }
    });
  }
  loadMilestones(projectId: number): void {
    this.milestoneService.getMilestones(projectId).subscribe((milestones) => {
      this.allMilestones = milestones;
      this.filterMilestones(milestones);
    });
  }
  onProjectChange(event: any): void {
    const projectId = +event.target.value;
    this.loadMilestones(projectId);
  }

 
  filterMilestones(milestones: Milestone[]): void {
    this.pendingMilestones = milestones.filter(m => m.status === 'NOT_STARTED' || m.status === 'IN_PROGRESS');
    this.approvedMilestones = milestones.filter(m => m.status === 'COMPLETED');
  }

  getStatusColorClass(status: string): string {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "IN_PROGRESS":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  }

  getSubmissionTypeIcon(type: string): string {
    switch (type) {
      case "document":
        return "description";
      case "image":
        return "image";
      case "link":
        return "link";
      default:
        return "description";
    }
  }
}
