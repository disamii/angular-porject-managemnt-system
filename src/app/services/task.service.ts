import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = '/api/v1/milestones';

  constructor(private http: HttpClient) {}

  // Mock data
  private mockTasks: Task[] = [
    {
      id: 1,
      name: 'Design UI',
      description: 'Create wireframes and UI mockups',
      status: 'IN_PROGRESS',
      milestone: {
        id: 1,
        name: 'Planning Phase',
        status: 'IN_PROGRESS'
      },
      assignedTo: {
        id: 1,
        firstName: 'Samson',
        lastName: 'Mamuye',
        email: 'samson@example.com'
      }
    },
    {
      id: 2,
      name: 'Set up backend',
      description: 'Initialize Django project and create models',
      status: 'NOT_STARTED',
      milestone: {
        id: 1,
        name: 'Planning Phase',
        status: 'IN_PROGRESS'
      },
      assignedTo: {
        id: 2,
        firstName: 'Liya',
        lastName: 'Tadesse',
        email: 'liya@example.com'
      }
    }
  ];

  // Get a task by ID
  getTask(milestoneId: number, taskId: number): Observable<Task> {
    // return this.http.get<Task>(`${this.baseUrl}/${milestoneId}/tasks/${taskId}`);
    return of(this.mockTasks.find(task => task.id === taskId && task.milestone.id === milestoneId)!);
  }

  // Update task details
  updateTask(milestoneId: number, taskId: number, task: Task): Observable<Task> {
    // return this.http.put<Task>(`${this.baseUrl}/${milestoneId}/tasks/${taskId}`, task);
    const index = this.mockTasks.findIndex(t => t.id === taskId && t.milestone.id === milestoneId);
    if (index !== -1) this.mockTasks[index] = task;
    return of(task);
  }

  // Delete a task
  deleteTask(milestoneId: number, taskId: number): Observable<void> {
    // return this.http.delete<void>(`${this.baseUrl}/${milestoneId}/tasks/${taskId}`);
    this.mockTasks = this.mockTasks.filter(task => task.id !== taskId || task.milestone.id !== milestoneId);
    return of();
  }

  // Get all tasks for a milestone
  getTasks(milestoneId: number): Observable<Task[]> {
    // return this.http.get<Task[]>(`${this.baseUrl}/${milestoneId}/tasks`);
    return of(this.mockTasks.filter(task => task.milestone.id === milestoneId));
  }

  // Create a new task
  createTask(milestoneId: number, task: Task): Observable<Task> {
    // return this.http.post<Task>(`${this.baseUrl}/${milestoneId}/tasks`, task);
    const newTask = { ...task, id: this.mockTasks.length + 1 };
    this.mockTasks.push(newTask);
    return of(newTask);
  }

  // Update task status
  updateTaskStatus(milestoneId: number, taskId: number, status: string): Observable<Task> {
    // return this.http.patch<Task>(`${this.baseUrl}/${milestoneId}/tasks/${taskId}/status`, { status });
    const task = this.mockTasks.find(t => t.id === taskId && t.milestone.id === milestoneId);
    if (task) task.status = status as Task['status'];
    return of(task!);
  }
}
