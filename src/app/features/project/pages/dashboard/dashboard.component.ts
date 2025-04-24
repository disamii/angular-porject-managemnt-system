import { Component, type OnInit } from "@angular/core"
import type { Project } from "../../models/project.model"
import  { ProjectService } from "../../services/project.service"
import  { NotificationService } from "../../services/notification.service"
import { MatChipsModule } from "@angular/material/chips"
import { MatIconModule } from "@angular/material/icon"

import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component"
import { ProjectCardComponent } from "../../components/project-card/project-card.component"
import { AlertComponent } from "../../components/alert/alert.component"
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button"
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  standalone:true,
    imports: [
    ProjectCardComponent,
    CommonModule,
    LoadingSpinnerComponent,
    AlertComponent,
    RouterModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule
    ]
})
export class DashboardComponent implements OnInit {
  projects: Project[] = []
  loading = true
  error = false

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,

  ) {
    console.log('DashboardComponent initialized');
  
  }
  

  ngOnInit(): void {
    this.loadProjects()
  }

  loadProjects(): void {
    this.loading = true
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects
        this.loading = false
      },
      error: (err) => {
        this.error = true
        this.loading = false
        this.notificationService.error("Failed to load projects")
      },
    })
  }

  createNewProject(): void {
    this.notificationService.info("This feature is coming soon!")
  }

  viewDemo(): void {
    this.notificationService.info("Demo mode activated")
  }
}
