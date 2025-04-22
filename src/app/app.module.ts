// import { NgModule } from "@angular/core"
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
// import { RouterModule } from "@angular/router"
// import { FormsModule, ReactiveFormsModule } from "@angular/forms"
// import { HttpClientModule } from "@angular/common/http"

// // // Angular Material Imports
// // import { MatToolbarModule } from "@angular/material/toolbar"
// // import { MatButtonModule } from "@angular/material/button"
// // import { MatIconModule } from "@angular/material/icon"
// // import { MatCardModule } from "@angular/material/card"
// // import { MatTabsModule } from "@angular/material/tabs"
// // import { MatBadgeModule } from "@angular/material/badge"
// // import { MatChipsModule } from "@angular/material/chips"
// // import { MatInputModule } from "@angular/material/input"
// // import { MatFormFieldModule } from "@angular/material/form-field"
// // import { MatSelectModule } from "@angular/material/select"
// // import { MatProgressBarModule } from "@angular/material/progress-bar"
// // import { MatMenuModule } from "@angular/material/menu"
// // import { MatSidenavModule } from "@angular/material/sidenav"
// // import { MatListModule } from "@angular/material/list"
// // import { MatDividerModule } from "@angular/material/divider"
// // import { MatDatepickerModule } from "@angular/material/datepicker"
// // import { MatNativeDateModule } from "@angular/material/core"
// // import { MatRadioModule } from "@angular/material/radio"
// // import { MatSlideToggleModule } from "@angular/material/slide-toggle"
// // import { MatTooltipModule } from "@angular/material/tooltip"
// // import { MatDialogModule } from "@angular/material/dialog"
// // import { MatSnackBarModule } from "@angular/material/snack-bar"
// // import { MatTableModule } from "@angular/material/table"
// // import { MatPaginatorModule } from "@angular/material/paginator"
// // import { MatSortModule } from "@angular/material/sort"
// // import { MatExpansionModule } from "@angular/material/expansion"
// // import { MatStepperModule } from "@angular/material/stepper"
// // import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
// // import { MatAutocompleteModule } from "@angular/material/autocomplete"
// // import { MatGridListModule } from "@angular/material/grid-list"
// // import { MatRippleModule } from "@angular/material/core"
// // import { MatBottomSheetModule } from "@angular/material/bottom-sheet"

// // // Components
// // import { AppComponent } from "./app.component"
// // import { HeaderComponent } from "./components/header/header.component"
// // import { FooterComponent } from "./components/footer/footer.component"
// // import { DashboardComponent } from "./pages/dashboard/dashboard.component"
// // import { ProjectsComponent } from "./pages/projects/projects.component"
// // import { ProjectDetailComponent } from "./pages/project-detail/project-detail.component"
// // import { MilestonesComponent } from "./pages/milestones/milestones.component"
// // import { ReportsComponent } from "./pages/reports/reports.component"
// // import { SettingsComponent } from "./pages/settings/settings.component"
// // import { ProjectCardComponent } from "./components/project-card/project-card.component"
// // import { MilestoneTimelineComponent } from "./components/milestone-timeline/milestone-timeline.component"
// // import { MilestoneFormComponent } from "./components/milestone-form/milestone-form.component"
// // import { MilestoneSubmissionComponent } from "./components/milestone-submission/milestone-submission.component"
// // import { ProjectProgressComponent } from "./components/project-progress/project-progress.component"
// // import { TeamMemberComponent } from "./components/team-member/team-member.component"
// // import { FileUploadComponent } from "./components/file-upload/file-upload.component"
// // import { ActivityFeedComponent } from "./components/activity-feed/activity-feed.component"
// // import { NotFoundComponent } from "./pages/not-found/not-found.component"
// // import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component"
// // import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component"
// // import { AlertComponent } from "./components/alert/alert.component"

// // // Services
// // import { ProjectService } from "./services/project.service"
// // import { MilestoneService } from "./services/milestone.service"
// // import { UserService } from "./services/user.service"
// // import { ReportService } from "./services/report.service"
// // import { NotificationService } from "./services/notification.service"
// // import { AuthService } from "./services/auth.service"
// // import { ThemeService } from "./services/theme.service"

// // // Routes
// // const routes = [
// //   { path: "", component: DashboardComponent },
// //   { path: "projects", component: ProjectsComponent },
// //   { path: "projects/:id", component: ProjectDetailComponent },
// //   { path: "milestones", component: MilestonesComponent },
// //   { path: "reports", component: ReportsComponent },
// //   { path: "settings", component: SettingsComponent },
// //   { path: "**", component: NotFoundComponent },
// // ]

// // @NgModule({
// //   declarations: [
//     // AppComponent,
//     // HeaderComponent,
//     // FooterComponent,
//     // DashboardComponent,
//     // ProjectsComponent,
//     // ProjectDetailComponent,
//     // MilestonesComponent,
//     // ReportsComponent,
//     // SettingsComponent,
//     // ProjectCardComponent,
//     // MilestoneTimelineComponent,
//     // MilestoneFormComponent,
//     // MilestoneSubmissionComponent,
//     // ProjectProgressComponent,
//     // TeamMemberComponent,
//     // FileUploadComponent,
//     // ActivityFeedComponent,
//     // NotFoundComponent,
//     // LoadingSpinnerComponent,
//     // ConfirmDialogComponent,
//     // AlertComponent,
// //   ],
// //   imports: [
//     // BrowserAnimationsModule,
//     // RouterModule.forRoot(routes),
//     // FormsModule,
//     // ReactiveFormsModule,
//     // HttpClientModule,
// //     MatToolbarModule,
// //     MatButtonModule,
// //     MatIconModule,
// //     MatCardModule,
// //     MatTabsModule,
// //     MatBadgeModule,
// //     MatChipsModule,
// //     MatInputModule,
// //     MatFormFieldModule,
// //     MatSelectModule,
// //     MatProgressBarModule,
// //     MatMenuModule,
// //     MatSidenavModule,
// //     MatListModule,
// //     MatDividerModule,
// //     MatDatepickerModule,
// //     MatNativeDateModule,
// //     MatRadioModule,
// //     MatSlideToggleModule,
// //     MatTooltipModule,
// //     MatDialogModule,
// //     MatSnackBarModule,
// //     MatTableModule,
// //     MatPaginatorModule,
// //     MatSortModule,
// //     MatExpansionModule,
// //     MatStepperModule,
// //     MatProgressSpinnerModule,
// //     MatAutocompleteModule,
// //     MatGridListModule,
// //     MatRippleModule,
// //     MatBottomSheetModule,
// //   ],
// //   providers: [
// //     ProjectService,
// //     MilestoneService,
// //     UserService,
// //     ReportService,
// //     NotificationService,
// //     AuthService,
// //     ThemeService,
// //   ],
// //   bootstrap: [AppComponent],
// // })
// // export class AppModule {}
