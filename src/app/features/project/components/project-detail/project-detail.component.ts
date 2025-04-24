import { Component, type OnInit } from "@angular/core"
import  { ActivatedRoute, Router, RouterModule } from "@angular/router"
import  { CreateProjectDto, Project } from "../../models/project.model"
import  { Milestone } from "../../models/project.model"
import  { ProjectService } from "../../services/project.service"
import  { NotificationService } from "../../services/notification.service"
import  { ActivityItem } from "../activity-feed/activity-feed.component"
import  { MatDialog } from "@angular/material/dialog"

import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatTabsModule } from "@angular/material/tabs"
import { MatDialogModule } from "@angular/material/dialog"
import { MatMenuModule } from "@angular/material/menu"

import { MilestoneTimelineComponent } from "../milestone-timeline/milestone-timeline.component"
import { MilestoneFormComponent } from "../milestone-form/milestone-form.component"
import { ProjectProgressComponent } from "../project-progress/project-progress.component"
import { TeamMemberComponent } from "../team-member/team-member.component"
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component"
import { ActivityFeedComponent } from "../activity-feed/activity-feed.component"
import { AlertComponent } from "../alert/alert.component"
import { CommonModule } from "@angular/common"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatButtonModule } from "@angular/material/button"
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component"
import { MatDividerModule } from "@angular/material/divider"
import { SelectPersonDialogComponent } from "../select-person-dialog/select-person-dialog.component"

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule
  ],
})
export class ProjectDetailComponent implements OnInit {
  projectId!: number
  project!: Project
  milestones: Milestone[] = []
  activeTab = "overview" 
  selectedIndex = 0 
  tabLabels: string[] = ["overview", "milestones", "team", "add-milestone"] 
  loading = true
  error = false
  isDeleting = false
  isUpdating = false

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
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    // private createProjectdto:CreateProjectDto
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = +params["id"]
      this.loadProject()
    })
  }

  loadProject(): void {
    this.loading = true
    this.projectService.getProject(this.projectId).subscribe({
      next: (project) => {
        if (project) {
          this.project = project
          this.milestones = project.milestones
          this.loading = false
        } else {
          this.error = true
          this.loading = false
          this.notificationService.error("Project not found")
        }
      },
      error: (err) => {
        this.error = true
        this.loading = false
        this.notificationService.error("Failed to load project")
        console.log(err)
      },
    })
  }

  setActiveTab(tab: string): void {
    const tabIndex = this.tabLabels.indexOf(tab) // Find the index based on the tab label
    if (tabIndex !== -1) {
      this.selectedIndex = tabIndex // Update selected index to show the selected tab
    }
  }


  calculateProgress(): number {
    if (this.project && this.project.milestones.length > 0) {
      const completedMilestones = this.project.milestones.filter((m) => m.status === "COMPLETED").length
      return (completedMilestones / this.project.milestones.length) * 100
    }
    return 0
  }

  getProjectStatus(): string {
    if (this.project && this.project.milestones.length > 0) {
      const allCompleted = this.project.milestones.every((m) => m.status === "COMPLETED")
      if (allCompleted) {
        return "COMPLETED"
      } else {
        const anyInProgress = this.project.milestones.some((m) => m.status === "IN_PROGRESS")
        return anyInProgress ? "IN_PROGRESS" : "NOT_STARTED"
      }
    }
    return "NOT_STARTED"
  }

  getCompletedMilestonesCount(): number {
    if (this.project) {
      return this.project.milestones.filter((m) => m.status === "COMPLETED").length
    }
    return 0
  }


  deleteProject(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Project",
        message: `Are you sure you want to delete "${this.project.title}"? This action cannot be undone.`,
        confirmText: "Delete",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isDeleting = true
        this.projectService.deleteProject(this.projectId).subscribe({
          next: () => {
            this.notificationService.success("Project deleted successfully")
            this.router.navigate(["/projects"])
          },
          error: (err) => {
            this.notificationService.error("Failed to delete project")
            console.error(err)
            this.isDeleting = false
          },
        })
      }
    })
  }

  addMemberToProject(userId: number): void {
    this.projectService.addMemberToProject(this.projectId, userId).subscribe({
      next: () => {
        this.notificationService.success("Member added to project")
        this.loadProject() // Reload project to get updated members list
      },
      error: (err) => {
        this.notificationService.error("Failed to add member to project")
        console.error(err)
      },
    })
  }

  removeMemberFromProject(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Remove Team Member",
        message: "Are you sure you want to remove this member from the project?",
        confirmText: "Remove",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.removeMemberFromProject(this.projectId, userId).subscribe({
          next: () => {
            this.notificationService.success("Member removed from project")
            this.loadProject() // Reload project to get updated members list
          },
          error: (err) => {
            this.notificationService.error("Failed to remove member from project")
            console.error(err)
          },
        })
      }
    })
  }

  // Method to open a dialog for adding a new team member
  openAddMemberDialog(): void {
    const dialogRef = this.dialog.open(SelectPersonDialogComponent, {
      width: "400px"
    })
  
    dialogRef.afterClosed().subscribe((selectedId) => {
      if (selectedId) {
        this.addMemberToProject(selectedId)
      }
    })
  }
  // Method to export project data
  exportProject(): void {
    // This would typically generate a report or export data
    this.notificationService.info("Project export functionality would be implemented here")
  }

  // Method to share project
  shareProject(): void {
    // This would typically open a sharing dialog
    this.notificationService.info("Project sharing functionality would be implemented here")
  }
}
