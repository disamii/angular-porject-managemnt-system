import { Component, type OnInit, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatTableModule } from "@angular/material/table"
import { MatSortModule, MatSort } from "@angular/material/sort"
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { MatChipsModule } from "@angular/material/chips"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatTableDataSource } from "@angular/material/table"

import { EvaluationAssignmentService } from "../../services/evaluation-assignment.service"
import { AssignmentResponse } from "../../models/assignment.model"
import { AddEditAssignmentDialogComponent } from "../../components/add-edit-assignment-dialog/add-edit-assignment-dialog.component"
import  { NotificationService } from "../../services/notification.service"
import { ConfirmDialogComponent } from "../../../../components/confirm-dialog/confirm-dialog.component"

@Component({
  selector: "app-assignment-management",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    // ConfirmDialogComponent,
    // AddEditAssignmentDialogComponent,
  ],
  templateUrl: "./assignment-management-component.html",
})
export class AssignmentManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  dataSource = new MatTableDataSource<AssignmentResponse>([])
  displayedColumns: string[] = ["proposalTitle", "evaluatorName", "rubricName", "status", "assignedDate", "actions"]

  searchTerm = ""
  statusFilter = ""
  sortBy = "proposalTitle"
  loading = true

  constructor(
    private assignmentService: EvaluationAssignmentService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadAssignments()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  loadAssignments(): void {
    this.loading = true
    this.assignmentService.getAllAssignments().subscribe({
      next: (assignments) => {
        this.dataSource.data = assignments
        this.loading = false
      },
      error: (err) => {
        this.notificationService.error("Failed to load assignments")
        this.loading = false
      },
    })
  }

  applyFilter(): void {
    // Apply search filter
    this.dataSource.filter = this.searchTerm.trim().toLowerCase()

    // Apply status filter
    if (this.statusFilter) {
      this.dataSource.data = this.dataSource.data.filter((assignment) => assignment.status === this.statusFilter)
    }

    // Reset pagination to first page
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  resetFilters(): void {
    this.searchTerm = ""
    this.statusFilter = ""
    this.sortBy = "proposalTitle"
    this.loadAssignments()
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AddEditAssignmentDialogComponent, {
      width: "600px",
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAssignments()
      }
    })
  }

  openEditDialog(assignment: AssignmentResponse): void {
    const dialogRef = this.dialog.open(AddEditAssignmentDialogComponent, {
      width: "600px",
      disableClose: true,
      data: { assignment },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAssignments()
      }
    })
  }

  deleteAssignment(assignment: AssignmentResponse): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Assignment",
        message: `Are you sure you want to delete the assignment for ${assignment.proposal.title}?`,
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmColor: "warn",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assignmentService.deleteAssignment(assignment.publicId).subscribe({
          next: () => {
            this.notificationService.success("Assignment deleted successfully")
            this.loadAssignments()
          },
          error: (err) => {
            this.notificationService.error("Failed to delete assignment")
          },
        })
      }
    })
  }
}
