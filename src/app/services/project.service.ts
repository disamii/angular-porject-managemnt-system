import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {of, Observable } from "rxjs";
import { Project, CreateProjectDto } from "../models/project.model";

@Injectable({
  providedIn: "root",
})
export class ProjectService {

  
  private apiUrl = "http://localhost:8080/api/v1/projects";

  private projects: Project[] = [
    {
      id: 1,
      title: "AI Research Assistant",
      description: "Developing a research assistant using machine learning",
      startDate: "2025-01-10T00:00:00.000Z",
      endDate: "2025-12-31T00:00:00.000Z",
      requestedBudget: 50000,
      allowedBudget: 45000,
      principalInvestigator: {
        id: 1,
        firstName: "Samson",
        lastName: "Mamuye",
        email: "samson@example.com",
      },
      researchAdvisor: {
        id: 2,
        firstName: "Abebe",
        lastName: "Tadesse",
        email: "abebe@example.com",
      },
      members: [
        { id: 3, firstName: "Liya", lastName: "Kebede", email: "liya@example.com" },
        { id: 4, firstName: "Mulu", lastName: "Gebremariam", email: "mulu@example.com" },
      ],
      milestones: [
        {
          id: 1,
          name: "Proposal Submission",
          description: "Initial proposal and planning",
          status: "COMPLETED",
          budget: 5000,
          researchProject: { id: 1, title: "AI Research Assistant" },
          tasks: [
            {
              id: 1,
              name: "Draft Proposal",
              description: "Write the draft version of the proposal",
              status: "COMPLETED",
              milestone: { id: 1, name: "Proposal Submission", status: "COMPLETED" },
              assignedTo: { id: 3, firstName: "Liya", lastName: "Kebede", email: "liya@example.com" },
            },
          ],
          deliverables: [
            {
              id: 1,
              name: "Proposal Document",
              description: "PDF of the project proposal",
              milestone: { id: 1, name: "Proposal Submission", status: "COMPLETED" },
              reviewed: true,
            },
          ],
        },
        {
          id: 2,
          name: "Initial Implementation",
          description: "Basic model development and integration",
          status: "IN_PROGRESS",
          budget: 20000,
          researchProject: { id: 1, title: "AI Research Assistant" },
          tasks: [
            {
              id: 2,
              name: "Build ML Model",
              description: "Train the initial version of the model",
              status: "IN_PROGRESS",
              milestone: { id: 2, name: "Initial Implementation", status: "IN_PROGRESS" },
              assignedTo: { id: 4, firstName: "Mulu", lastName: "Gebremariam", email: "mulu@example.com" },
            },
          ],
          deliverables: [
            {
              id: 2,
              name: "Prototype",
              description: "Working prototype of the AI assistant",
              milestone: { id: 2, name: "Initial Implementation", status: "IN_PROGRESS" },
              reviewed: false,
            },
          ],
        },
      ],
      researchProposal: { id: 1, title: "AI Research Assistant" },
    },
    {
      id: 2,
      title: "Sustainable Water Management",
      description: "Using IoT and sensors for optimizing irrigation and water distribution",
      startDate: "2025-03-01T00:00:00.000Z",
      endDate: "2026-02-28T00:00:00.000Z",
      requestedBudget: 70000,
      allowedBudget: 65000,
      principalInvestigator: {
        id: 5,
        firstName: "Hana",
        lastName: "Tesfaye",
        email: "hana@example.com",
      },
      researchAdvisor: {
        id: 6,
        firstName: "Dereje",
        lastName: "Mengistu",
        email: "dereje@example.com",
      },
      members: [
        { id: 7, firstName: "Kaleab", lastName: "Yilma", email: "kaleab@example.com" },
        { id: 8, firstName: "Selam", lastName: "Fekadu", email: "selam@example.com" },
      ],
      milestones: [
        {
          id: 3,
          name: "Sensor Integration",
          description: "Installing and testing IoT sensors in the field",
          status: "NOT_STARTED",
          budget: 15000,
          researchProject: { id: 2, title: "Sustainable Water Management" },
          tasks: [],
          deliverables: [],
        },
        {
          id: 4,
          name: "Data Collection & Analysis",
          description: "Analyzing the collected data to improve system efficiency",
          status: "NOT_STARTED",
          budget: 20000,
          researchProject: { id: 2, title: "Sustainable Water Management" },
          tasks: [],
          deliverables: [],
        },
      ],
      researchProposal: { id: 2, title: "Sustainable Water Management" },
    },
  ];
  





  constructor(private http: HttpClient) {}

  // GET /api/v1/projects/{id} - Get project by ID
  getProject(id: number): Observable<Project|undefined> {
    // return this.http.get<Project>(`${this.apiUrl}/${id}`);
      const project = this.projects.find(p => p.id === id);
      return of(project);
  }


  // PUT /api/v1/projects/{id} - Update project details
  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  // DELETE /api/v1/projects/{id} - Delete a project
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // getProjects(): Observable<Project[]> {
  // }

  // GET /api/v1/projects - Get all projects
  getProjects(): Observable<Project[]> {
    // return this.http.get<Project[]>(this.apiUrl);
        return of(this.projects);

  }

  // POST /api/v1/projects - Create project
  createProject(project: CreateProjectDto): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  // POST /api/v1/projects/{projectId}/members/{userId} - Add user to project members
  addMemberToProject(projectId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${projectId}/members/${userId}`, {});
  }

  // DELETE /api/v1/projects/{projectId}/members/{userId} - Remove user from project members
  removeMemberFromProject(projectId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/members/${userId}`);
  }

  // GET /api/v1/projects/user/{userId} - Get projects where user is involved
  getProjectsByUser(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/user/${userId}`);
  }

  // GET /api/v1/projects/pageable - Get all projects with pagination
  getProjectsWithPagination(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pageable`, { params: { page, size } });
  }

  
}
