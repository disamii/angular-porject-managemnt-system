import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { MilestonesComponent } from './pages/milestones/milestones.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DeliverableListComponent } from './pages/deliverable/deliverable.component';
import { TaskListComponent } from './pages/task/task-list-component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/new', component: ProjectFormComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
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

