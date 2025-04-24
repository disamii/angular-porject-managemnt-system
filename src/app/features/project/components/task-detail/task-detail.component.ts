import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ActivatedRoute, Router } from "@angular/router"
import  { TaskService } from "../../services/task.service"
import  { Task } from "../../models/task.model"

// Angular Material Imports
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class TaskDetailComponent implements OnInit {
  milestoneId = 0
  taskId = 0
  task: Task | null = null
  loading = true
  error: string | null = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.milestoneId = +params["milestoneId"]
      this.taskId = +params["taskId"]
      this.loadTask()
    })
  }

  loadTask(): void {
    this.loading = true
    this.taskService.getTask(this.milestoneId, this.taskId).subscribe({
      next: (task) => {
        this.task = task
        this.loading = false
      },
      error: (err) => {
        this.error = "Failed to load task details. Please try again."
        this.loading = false
        console.error("Error loading task:", err)
      },
    })
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "NOT_STARTED":
        return "status-not-started"
      case "IN_PROGRESS":
        return "status-in-progress"
      case "COMPLETED":
        return "status-completed"
      default:
        return ""
    }
  }

  navigateToTaskList(): void {
    this.router.navigate(["/milestones", this.milestoneId, "tasks"])
  }

  navigateToEditTask(): void {
    this.router.navigate(["/milestones", this.milestoneId, "tasks", this.taskId, "edit"])
  }
}
