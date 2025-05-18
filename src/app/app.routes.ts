import { Routes } from '@angular/router';
import { DashboardComponent } from './features/project/pages/dashboard/dashboard.component';
import { NotFoundComponent } from './features/project/pages/not-found/not-found.component';

export const routes: Routes = [
  // { path: '', component: DashboardComponent },
  // {
  //   path: "",
  //   loadChildren: () =>
  //     import("./features/project/project-management.routes").then((m) => m.PROJECT_ROUTES),
  // },
  {
    path: "evaluation",
    loadChildren: () =>
      import("./features/proposal-evaluation/proposal-evaluation.routes").then((m) => m.PROPOSAL_EVALUATION_ROUTES),
  },
  { path: '**', component: NotFoundComponent },

];

