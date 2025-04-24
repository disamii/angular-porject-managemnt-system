import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ReactiveFormsModule,  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { ActivatedRoute, Router } from "@angular/router"
import  { TaskService } from "../../services/task.service"
import  { Task, Person } from "../../models/task.model"
import  { PersonService } from "../../services/person.service"
// 
// Angular Material Imports
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup
  milestoneId = 0
  taskId: number | null = null
  isEditing = false
  loading = false
  submitting = false
  people: Person[] = []

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private personService: PersonService,
  ) {
    this.taskForm = this.fb.group({
      name: ["", [Validators.required]],
      description: [""],
      status: ["NOT_STARTED", [Validators.required]],
      assignedToId: [null],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.milestoneId = +params["milestoneId"]
      if (params["taskId"]) {
        this.taskId = +params["taskId"]
        this.isEditing = true
        this.loadTask()
      }
    })

    this.loadPeople()
  }

  loadTask(): void {
    if (!this.taskId) return

    this.loading = true
    this.taskService.getTask(this.milestoneId, this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          name: task.name,
          description: task.description,
          status: task.status,
          assignedToId: task.assignedTo?.id || null,
        })
        this.loading = false
      },
      error: (err) => {
        console.error("Error loading task:", err)
        this.loading = false
      },
    })
  }

  loadPeople(): void {
    this.personService.getPeople().subscribe({
      next: (people) => {
        this.people = people
      },
      error: (err) => {
        console.error("Error loading people:", err)
      },
    })
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return
    }

    this.submitting = true
    const formValues = this.taskForm.value

    // Find the assigned person object
    const assignedPerson = this.people.find((p) => p.id === formValues.assignedToId)
    if (!assignedPerson) {
        throw new Error('assignedPerson is required');
      }
      
      
    const task: Task = {
      id: this.taskId || 0,
      name: formValues.name,
      description: formValues.description,
      status: formValues.status,
      milestone: { id: this.milestoneId, name: "", status: "NOT_STARTED" },
      assignedTo: assignedPerson,
    }

    if (this.isEditing && this.taskId) {
      this.taskService.updateTask(this.milestoneId, this.taskId, task).subscribe({
        next: () => {
          this.router.navigate(["/milestones", this.milestoneId, "tasks"])
        },
        error: (err) => {
          console.error("Error updating task:", err)
          this.submitting = false
        },
      })
    } else {
      this.taskService.createTask(this.milestoneId, task).subscribe({
        next: () => {
          this.router.navigate(["/milestones", this.milestoneId, "tasks"])
        },
        error: (err) => {
          console.error("Error creating task:", err)
          this.submitting = false
        },
      })
    }
  }

  cancel(): void {
    this.router.navigate(["/milestones", this.milestoneId, "tasks"])
  }
}
