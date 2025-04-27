import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatTabsModule } from "@angular/material/tabs"
import { MatChipsModule } from "@angular/material/chips"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import { MatSnackBarModule,  MatSnackBar } from "@angular/material/snack-bar"
import { MatOptionModule } from "@angular/material/core"
import { MatMenuModule } from "@angular/material/menu"
import { MilestoneFormComponent } from "../../components/milestone-form/milestone-form.component"
import { ProjectService } from "../../services/project.service"
import { Milestone } from "../../models/project.model"
import { MilestoneService } from "../../services/milestone.service"
import { ConfirmDialogComponent } from "../../../../components/confirm-dialog/confirm-dialog.component"

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
    MatOptionModule,
    MatMenuModule,
  ],
})
export class MilestonesComponent implements OnInit {
  allMilestones: Milestone[] = []
  pendingMilestones: Milestone[] = []
  approvedMilestones: Milestone[] = []
  searchTerm = ""
  allProjects: any[] = []
  selectedProjectId = 0
  loading = false

  constructor(
    private projectService: ProjectService,
    private milestoneService: MilestoneService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadProjects()
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.allProjects = projects

        // Automatically select the first project and load its milestones
        if (projects.length > 0) {
          this.selectedProjectId = projects[0].id
          this.loadMilestones(this.selectedProjectId)
        }
      },
      error: (error) => {
        this.showSnackBar("Failed to load projects")
        console.error("Error loading projects:", error)
      },
    })
  }

  loadMilestones(projectId: number): void {
    this.loading = true
    this.milestoneService.getMilestones(projectId).subscribe({
      next: (milestones) => {
        this.allMilestones = milestones
        this.filterMilestones(milestones)
        this.loading = false
      },
      error: (error) => {
        this.showSnackBar("Failed to load milestones")
        console.error("Error loading milestones:", error)
        this.loading = false
      },
    })
  }

  onProjectChange(event: any): void {
    const projectId = +event.target.value
    this.selectedProjectId = projectId
    this.loadMilestones(projectId)
  }

  filterMilestones(milestones: Milestone[]): void {
    this.pendingMilestones = milestones.filter((m) => m.status === "NOT_STARTED" || m.status === "IN_PROGRESS")
    this.approvedMilestones = milestones.filter((m) => m.status === "COMPLETED")
  }

  getStatusColorClass(status: string): string {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "IN_PROGRESS":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  getSubmissionTypeIcon(type: string): string {
    switch (type) {
      case "document":
        return "description"
      case "image":
        return "image"
      case "link":
        return "link"
      default:
        return "description"
    }
  }

  // New methods to support all MilestoneService operations

  viewMilestoneDetails(milestone: Milestone): void {
    // Navigate to milestone details page or open a dialog
    // For now, we'll just show the milestone details in a snackbar
    this.showSnackBar(`Viewing details for milestone: ${milestone.name}`)
  }

  openCreateMilestoneDialog(): void {
    const dialogRef = this.dialog.open(MilestoneFormComponent, {
      width: "600px",
      data: {
        projectId: this.selectedProjectId,
        isEditing: false,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createMilestone(result)
      }
    })
  }

  openEditMilestoneDialog(milestone: Milestone): void {
    const dialogRef = this.dialog.open(MilestoneFormComponent, {
      width: "600px",
      data: {
        projectId: this.selectedProjectId,
        milestone: milestone,
        isEditing: true,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateMilestone(milestone.id, result)
      }
    })
  }

  openDeleteConfirmDialog(milestone: Milestone): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Milestone",
        message: `Are you sure you want to delete the milestone "${milestone.name}"? This action cannot be undone.`,
        confirmText: "Delete",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMilestone(milestone)
      }
    })
  }

  getMilestone(milestoneId: number): void {
    this.milestoneService.getMilestone(this.selectedProjectId, milestoneId).subscribe({
      next: (milestone) => {
        // Handle the milestone data, perhaps open a dialog or navigate to details
        this.showSnackBar(`Retrieved milestone: ${milestone.name}`)
      },
      error: (error) => {
        this.showSnackBar("Failed to get milestone details")
        console.error("Error getting milestone:", error)
      },
    })
  }

  createMilestone(milestone: Milestone): void {
    this.milestoneService.createMilestone(this.selectedProjectId, milestone).subscribe({
      next: (createdMilestone) => {
        this.showSnackBar("Milestone created successfully")
        this.loadMilestones(this.selectedProjectId) // Reload milestones
      },
      error: (error) => {
        this.showSnackBar("Failed to create milestone")
        console.error("Error creating milestone:", error)
      },
    })
  }

  updateMilestone(milestoneId: number, milestone: Milestone): void {
    this.milestoneService.updateMilestone(this.selectedProjectId, milestoneId, milestone).subscribe({
      next: (updatedMilestone) => {
        this.showSnackBar("Milestone updated successfully")
        this.loadMilestones(this.selectedProjectId) // Reload milestones
      },
      error: (error) => {
        this.showSnackBar("Failed to update milestone")
        console.error("Error updating milestone:", error)
      },
    })
  }

  deleteMilestone(milestone: Milestone): void {
    this.milestoneService.deleteMilestone(this.selectedProjectId, milestone.id).subscribe({
      next: () => {
        this.showSnackBar("Milestone deleted successfully")
        this.loadMilestones(this.selectedProjectId) // Reload milestones
      },
      error: (error) => {
        this.showSnackBar("Failed to delete milestone")
        console.error("Error deleting milestone:", error)
      },
    })
  }

  approveMilestone(milestone: Milestone): void {
    const updatedMilestone = { ...milestone, status: "COMPLETED" as 'COMPLETED' };
    this.updateMilestone(milestone.id, updatedMilestone);
  }
  
  showSnackBar(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    })
  }
}
