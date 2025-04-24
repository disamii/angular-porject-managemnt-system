import { Component, type OnInit } from "@angular/core"
import { RouterModule } from "@angular/router"

import type { Project } from "../../models/project.model"
import  { ProjectService } from "../../services/project.service"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"

import { CommonModule } from '@angular/common';


import { ProjectCardComponent } from "../../components/project-card/project-card.component"

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  standalone:true,
  imports: [
    RouterModule,
    ProjectCardComponent,
    CommonModule,
    MatIconModule,
    MatCardModule,   
    MatButtonModule,

  ],
})


export class ProjectsComponent implements OnInit {
  allProjects: Project[] = []
  activeProjects: Project[] = []
  completedProjects: Project[] = []
  searchTerm = ""

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.allProjects = projects
    })

 
  }
}
