import { Component, type OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import type { Project } from "../../models/project.model";
import type { Milestone } from "../../models/project.model";
import { ProjectService } from "../../services/project.service";
import { NotificationService } from "../../services/notification.service";
import type { ActivityItem } from "../../components/activity-feed/activity-feed.component";

import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";

import { MilestoneTimelineComponent } from "../../components/milestone-timeline/milestone-timeline.component";
import { MilestoneFormComponent } from "../../components/milestone-form/milestone-form.component";
import { ProjectProgressComponent } from "../../components/project-progress/project-progress.component";
import { TeamMemberComponent } from "../../components/team-member/team-member.component";
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";
import { ActivityFeedComponent } from "../../components/activity-feed/activity-feed.component";
import { AlertComponent } from "../../components/alert/alert.component";
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  standalone: true,
  imports: [
    CommonModule,
    MilestoneTimelineComponent,
    MilestoneFormComponent,
    TeamMemberComponent,
    ActivityFeedComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    ProjectProgressComponent,
    MatButtonModule

],
})
export class ProjectDetailComponent implements OnInit {
  projectId!: number;
  project!: Project;
  milestones: Milestone[] = [];
  activeTab: string = 'overview';  // default tab
  selectedIndex: number = 0;  // to control the selected tab index
  tabLabels: string[] = ['overview', 'milestones', 'team'];  // Array to map tab labels to indices
  loading = true;
  error = false;

  recentActivities: ActivityItem[] = [
    {
      id: 1,
      type: "milestone",
      title: "Milestone Completed",
      description: "Development - Phase 1",
      timestamp: "2 days ago",
    },
    {
      id: 2,
      type: "comment",
      title: "Comment Added",
      description: "Jane added a comment to Design Phase",
      timestamp: "3 days ago",
    },
    {
      id: 3,
      type: "approval",
      title: "Milestone Approved",
      description: "Design Phase approved by Advisor",
      timestamp: "1 week ago",
    },
    {
      id: 4,
      type: "file",
      title: "File Uploaded",
      description: "Robert uploaded design_mockups.zip",
      timestamp: "1 week ago",
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = +params["id"];
      this.loadProject();
    });
  }

  loadProject(): void {
    this.loading = true;
    this.projectService.getProject(this.projectId).subscribe({
      next: (project) => {
        if (project) {
          this.project = project;
          this.milestones = project.milestones; 
          this.loading = false;
        } else {
          this.error = true;
          this.loading = false;
          this.notificationService.error("Project not found we are so sorry");
        }
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.notificationService.error("Failed to load project");
        console.log(err)
      },
    });
  }

  setActiveTab(tab: string): void {
    const tabIndex = this.tabLabels.indexOf(tab);  // Find the index based on the tab label
    if (tabIndex !== -1) {
      this.selectedIndex = tabIndex;  // Update selected index to show the selected tab
    }
  }

  onMilestoneStatusChange(milestoneId: number, newStatus: string): void {
    // Update milestone status
    this.notificationService.success(`Milestone status updated to ${newStatus}`);
  }

  onMilestoneApprovalRequest(milestoneId: number): void {
    // Request milestone approval
    this.notificationService.info("Milestone approval requested");
  }
  calculateProgress(): number {
    if (this.project && this.project.milestones.length > 0) {
      const completedMilestones = this.project.milestones.filter(m => m.status === 'COMPLETED').length;
      return (completedMilestones / this.project.milestones.length) * 100;
    }
    return 0;
  }
  
  getProjectStatus(): string {
    if (this.project && this.project.milestones.length > 0) {
      const allCompleted = this.project.milestones.every(m => m.status === 'COMPLETED');
      if (allCompleted) {
        return 'COMPLETED';
      } else {
        const anyInProgress = this.project.milestones.some(m => m.status === 'IN_PROGRESS');
        return anyInProgress ? 'IN_PROGRESS' : 'NOT_STARTED';
      }
    }
    return 'NOT_STARTED';
  }
  
  getCompletedMilestonesCount(): number {
    if (this.project) {
      return this.project.milestones.filter(m => m.status === 'COMPLETED').length;
    }
    return 0;
  }
  
}
