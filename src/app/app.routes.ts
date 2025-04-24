import { Routes } from '@angular/router';
import { ProjectDetailComponent } from './features/project/components/project-detail/project-detail.component';
import { ProjectFormComponent } from './features/project/components/project-form/project-form.component';
import { TaskDetailComponent } from './features/project/components/task-detail/task-detail.component';
import { TaskFormComponent } from './features/project/components/task-form/task-form.component';
import { DashboardComponent } from './features/project/pages/dashboard/dashboard.component';
import { DeliverableListComponent } from './features/project/pages/deliverable/deliverable.component';
import { MilestonesComponent } from './features/project/pages/milestones/milestones.component';
import { NotFoundComponent } from './features/project/pages/not-found/not-found.component';
import { ProjectsComponent } from './features/project/pages/projects/projects.component';
import { ReportsComponent } from './features/project/pages/reports/reports.component';
import { SettingsComponent } from './features/project/pages/settings/settings.component';
import { TaskListComponent } from './features/project/pages/task/task-list-component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/new', component: ProjectFormComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  {
    path: 'projects/:id/edit',
    component: ProjectFormComponent,
  },
  { path: 'milestones', component: MilestonesComponent },
  { path: 'deliverables/:milestoneId', component: DeliverableListComponent },
  { path: 'milestones/:milestoneId/tasks', component: TaskListComponent },
  { path: 'milestones/:milestoneId/tasks/new', component: TaskFormComponent },
  { path: 'milestones/:milestoneId/tasks/:taskId', component: TaskDetailComponent },
  { path: 'milestones/:milestoneId/tasks/:taskId/edit', component: TaskFormComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: NotFoundComponent },
];

