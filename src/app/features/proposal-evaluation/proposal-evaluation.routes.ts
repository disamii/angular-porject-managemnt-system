import type { Routes } from "@angular/router"

export const PROPOSAL_EVALUATION_ROUTES: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./pages/evaluation-dashboard/evaluation-dashboard.component").then((c) => c.EvaluationDashboardComponent),
    title: "Evaluation Dashboard",
  },
  {
    path: "evaluator-dashboard",
    loadComponent: () =>
      import("./pages/evaluator-dashboard/evaluator-dashboard.component").then((c) => c.EvaluatorDashboardComponent),
    title: "Evaluator Dashboard",
  },
  {
    path: "evaluate/:id",
    loadComponent: () =>
      import("./pages/proposal-evaluation/proposal-evaluation.component").then((c) => c.ProposalEvaluationComponent),
    title: "Evaluate Proposal",
  },
  {
    path: "assignments",
    loadComponent: () =>
      import("./pages/assignment-management/assignment-management.component").then(
        (c) => c.AssignmentManagementComponent,
      ),
    title: "Assignment Management",
  },
  {
    path: "assignments/:id",
    loadComponent: () =>
      import("./pages/assignment-detail/assignment-detail.component").then((c) => c.AssignmentDetailComponent),
    title: "Assignment Detail",
  },
  {
    path: "score/:id",
    loadComponent: () =>
      import("./pages/score-submission/score-submission.component").then((c) => c.ScoreSubmissionComponent),
    title: "Score Submission",
  },
  {
    path: "rubrics",
    loadComponent: () =>
      import("./pages/rubric-management/rubric-management.component").then((c) => c.RubricManagementComponent),
    title: "Rubric Management",
  },
  {
    path: "rubrics/:id",
    loadComponent: () => import("./pages/rubric-detail/rubric-detail.component").then((c) => c.RubricDetailComponent),
    title: "Rubric Detail",
  },
  {
    path: "evaluators",
    loadComponent: () =>
      import("./pages/evaluator-management/evaluator-management.component").then((c) => c.EvaluatorManagementComponent),
    title: "Evaluator Management",
  },
  {
    path: "evaluators/:id",
    loadComponent: () =>
      import("./pages/evaluator-detail/evaluator-detail.component").then((c) => c.EvaluatorDetailComponent),
    title: "Evaluator Detail",
  },
]
