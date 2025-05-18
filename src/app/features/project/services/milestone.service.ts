import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Milestone } from '../models/milestone.model';

@Injectable({
  providedIn: 'root',
})
export class MilestoneService {
  private baseUrl = '/api/v1/projects';
  
  private  milestones: Milestone[] = [
    {
      id: 1,
      name: "Project Planning",
      description: "Define project scope, objectives, and requirements",
      status: "COMPLETED",
      budget: 5000,
      researchProject: {
        id: 1,
        title: "Website Redesign",
      },
      tasks: [
        {
          id: 1,
          name: "Define Scope",
          description: "List the features and limits of the project",
          status: "COMPLETED",
          milestone: { id: 1, name: "Project Planning", status: "COMPLETED" },
          assignedTo: {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
          },
        },
      ],
      deliverables: [
        {
          id: 1,
          name: "Project Plan Document",
          description: "Detailed project plan",
          milestone: { id: 1, name: "Project Planning", status: "COMPLETED" },
          reviewed: true,
        },
      ],
    },
    {
      id: 2,
      name: "Design Phase",
      description: "Create wireframes and design mockups",
      status: "COMPLETED",
      budget: 6000,
      researchProject: {
        id: 1,
        title: "Website Redesign",
      },
      tasks: [
        {
          id: 2,
          name: "Wireframes",
          description: "Create initial wireframes",
          status: "COMPLETED",
          milestone: { id: 2, name: "Design Phase", status: "COMPLETED" },
          assignedTo: {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
          },
        },
      ],
      deliverables: [
        {
          id: 2,
          name: "Mockups",
          description: "Final mockup designs",
          milestone: { id: 2, name: "Design Phase", status: "COMPLETED" },
          reviewed: true,
        },
      ],
    },
    {
      id: 3,
      name: "Development - Phase 1",
      description: "Implement core functionality and features",
      status: "COMPLETED",
      budget: 10000,
      researchProject: {
        id: 1,
        title: "Website Redesign",
      },
      tasks: [
        {
          id: 3,
          name: "Implement Authentication",
          description: "Add login and registration",
          status: "COMPLETED",
          milestone: { id: 3, name: "Development - Phase 1", status: "COMPLETED" },
          assignedTo: {
            id: 3,
            firstName: "Robert",
            lastName: "Johnson",
            email: "robert.johnson@example.com",
          },
        },
      ],
      deliverables: [
        {
          id: 3,
          name: "Source Code",
          description: "Initial GitHub repository",
          milestone: { id: 3, name: "Development - Phase 1", status: "COMPLETED" },
          reviewed: true,
        },
      ],
    },
    {
      id: 4,
      name: "Initial Research",
      description: "Market research and competitor analysis",
      status: "COMPLETED",
      budget: 4000,
      researchProject: {
        id: 2,
        title: "Marketing Campaign",
      },
      tasks: [
        {
          id: 4,
          name: "Market Analysis",
          description: "Research trends and demands",
          status: "COMPLETED",
          milestone: { id: 4, name: "Initial Research", status: "COMPLETED" },
          assignedTo: {
            id: 4,
            firstName: "Emily",
            lastName: "Chen",
            email: "emily.chen@example.com",
          },
        },
      ],
      deliverables: [
        {
          id: 4,
          name: "Research Report",
          description: "PDF report on market findings",
          milestone: { id: 4, name: "Initial Research", status: "COMPLETED" },
          reviewed: true,
        },
      ],
    },
  ]
  

  constructor(private http: HttpClient) {}

  // GET /api/v1/projects/{projectId}/milestones/{milestoneId} - Get milestone by ID
  getMilestone(projectId: number, milestoneId: number): Observable<Milestone> {
    return this.http.get<Milestone>(`${this.baseUrl}/${projectId}/milestones/${milestoneId}`);
  }

  // PUT /api/v1/projects/{projectId}/milestones/{milestoneId} - Update milestone details
  updateMilestone(projectId: number, milestoneId: number, milestone: Milestone): Observable<Milestone> {
    return this.http.put<Milestone>(`${this.baseUrl}/${projectId}/milestones/${milestoneId}`, milestone);
  }

  // DELETE /api/v1/projects/{projectId}/milestones/{milestoneId} - Delete a milestone
  deleteMilestone(projectId: number, milestoneId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${projectId}/milestones/${milestoneId}`);
  }

  // GET /api/v1/projects/{projectId}/milestones - Get all milestones for a project
  // getMilestones(projectId: number): Observable<Milestone[]> {
  //   return this.http.get<Milestone[]>(`${this.baseUrl}/${projectId}/milestones`);
  // }
  
  updateMilestoneStatus(
    projectId: number,
    milestoneId: number,
    status: 'NOT_STARTED' | 'COMPLETED' | 'IN_PROGRESS'
  ): Observable<Milestone> {
    const url = `/api/v1/projects/${projectId}/milestones/${milestoneId}/status`;
    return this.http.patch<Milestone>(url, { status });
  }
  
  getMilestones(projectId: number): Observable<Milestone[]> {
    return of(this.milestones.filter(milestone => milestone.researchProject.id === projectId));
  }

  // POST /api/v1/projects/{projectId}/milestones - Create a new milestone
  createMilestone(projectId: number, milestone: Milestone): Observable<Milestone> {
    return this.http.post<Milestone>(`${this.baseUrl}/${projectId}/milestones`, milestone);
  }


}
