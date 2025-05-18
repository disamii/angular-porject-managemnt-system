import type { Routes } from "@angular/router";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const PROJECT_ROUTES: Routes = [
  {
    path: "",
    redirectTo: "projects",
    pathMatch: "full",
  },
  {
    path: "projects",
    loadComponent: () =>
      import("./pages/projects/projects.component").then((c) => c.ProjectsComponent),
    title: "Projects",
  },
  {
    path: "projects/new",
    loadComponent: () =>
      import("./components/project-form/project-form.component").then((c) => c.ProjectFormComponent),
    title: "New Project",
  },
  {
    path: "projects/:id",
    loadComponent: () =>
      import("./components/project-detail/project-detail.component").then((c) => c.ProjectDetailComponent),
    title: "Project Detail",
  },
  {
    path: "projects/:id/edit",
    loadComponent: () =>
      import("./components/project-form/project-form.component").then((c) => c.ProjectFormComponent),
    title: "Edit Project",
  },
  {
    path: "milestones",
    loadComponent: () =>
      import("./pages/milestones/milestones.component").then((c) => c.MilestonesComponent),
    title: "Milestones",
  },
  {
    path: "milestones/:milestoneId/deliverables",
    loadComponent: () =>
      import("./pages/deliverable/deliverable.component").then((c) => c.DeliverableListComponent),
    title: "Deliverables",
  },
  {
    path: "milestones/:milestoneId/deliverables/:deliverableId",
    loadComponent: () =>
      import("./components/deliverable-detail/deliverable-detail.component").then((c) => c.DeliverableDetailComponent),
    title: "Deliverable Detail",
  },
  {
    path: "milestones/:milestoneId/tasks",
    loadComponent: () =>
      import("./pages/task/task-list.component").then((c) => c.TaskListComponent),
    title: "Tasks",
  },
  {
    path: "milestones/:milestoneId/tasks/new",
    loadComponent: () =>
      import("./components/task-form/task-form.component").then((c) => c.TaskFormComponent),
    title: "New Task",
  },
  {
    path: "milestones/:milestoneId/tasks/:taskId",
    loadComponent: () =>
      import("./components/task-detail/task-detail.component").then((c) => c.TaskDetailComponent),
    title: "Task Detail",
  },
  {
    path: "milestones/:milestoneId/tasks/:taskId/edit",
    loadComponent: () =>
      import("./components/task-form/task-form.component").then((c) => c.TaskFormComponent),
    title: "Edit Task",
  },
  {
    path: "reports",
    loadComponent: () =>
      import("./pages/reports/reports.component").then((c) => c.ReportsComponent),
    title: "Reports",
  },
  {
    path: "settings",
    loadComponent: () =>
      import("./pages/settings/settings.component").then((c) => c.SettingsComponent),
    title: "Settings",
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
