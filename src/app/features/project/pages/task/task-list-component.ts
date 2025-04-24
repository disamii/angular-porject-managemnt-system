import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import  { ActivatedRoute, Router } from "@angular/router"
import  { TaskService } from "../../services/task.service"
import  { Task } from "../../models/task.model"

// Angular Material Imports
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatMenuModule } from "@angular/material/menu"
import { MatDialogModule } from "@angular/material/dialog"
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component"

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
  ],
})
export class TaskListComponent implements OnInit {
  milestoneId = 0
  tasks: Task[] = []
  loading = true
  error: string | null = null
  taskToDelete: Task | null = null
  dropdownOpenIndex: number | null = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.milestoneId = +params["milestoneId"]
      this.loadTasks()
    })
  }

  loadTasks(): void {
    this.loading = true
    this.taskService.getTasks(this.milestoneId).subscribe({
      next: (tasks) => {
        this.tasks = tasks
        this.loading = false
      },
      error: (err) => {
        this.error = "Failed to load tasks. Please try again."
        this.loading = false
        console.error("Error loading tasks:", err)
      },
    })
  }

  updateTaskStatus(task: Task, status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"): void {
    this.taskService.updateTaskStatus(this.milestoneId, task.id, status).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === task.id)
        if (index !== -1) {
          this.tasks[index] = updatedTask
        }
      },
      error: (err) => {
        console.error("Error updating task status:", err)
      },
    })
  }

  confirmDelete(task: Task): void {
    this.taskToDelete = task
  }

  deleteTask(): void {
    if (!this.taskToDelete) return

    this.taskService.deleteTask(this.milestoneId, this.taskToDelete.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== this.taskToDelete!.id)
        this.taskToDelete = null
      },
      error: (err) => {
        console.error("Error deleting task:", err)
      },
    })
  }

  cancelDelete(): void {
    this.taskToDelete = null
  }

  toggleDropdown(index: number): void {
    this.dropdownOpenIndex = this.dropdownOpenIndex === index ? null : index
  }

  closeDropdown(): void {
    this.dropdownOpenIndex = null
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "NOT_STARTED":
        return "bg-gray-200 text-gray-800"
      case "IN_PROGRESS":
        return "bg-blue-200 text-blue-800"
      case "COMPLETED":
        return "bg-green-200 text-green-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  getStatusButtonClass(taskStatus: string, buttonStatus: string): string {
    const baseClasses = "px-3 py-1 rounded text-sm transition-colors"

    if (taskStatus === buttonStatus) {
      switch (buttonStatus) {
        case "NOT_STARTED":
          return `${baseClasses} bg-gray-200 text-gray-400 cursor-not-allowed`
        case "IN_PROGRESS":
          return `${baseClasses} bg-blue-200 text-blue-400 cursor-not-allowed`
        case "COMPLETED":
          return `${baseClasses} bg-green-200 text-green-400 cursor-not-allowed`
      }
    }

    switch (buttonStatus) {
      case "NOT_STARTED":
        return `${baseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300`
      case "IN_PROGRESS":
        return `${baseClasses} bg-blue-100 text-blue-700 hover:bg-blue-200`
      case "COMPLETED":
        return `${baseClasses} bg-green-100 text-green-700 hover:bg-green-200`
      default:
        return baseClasses
    }
  }

  navigateToTaskDetail(taskId: number): void {
    this.router.navigate(["/milestones", this.milestoneId, "tasks", taskId])
  }

  navigateToEditTask(taskId: number): void {
    this.router.navigate(["/milestones", this.milestoneId, "tasks", taskId, "edit"])
  }

  navigateToCreateTask(): void {
    this.router.navigate(["/milestones", this.milestoneId, "tasks", "new"])
  }
}
