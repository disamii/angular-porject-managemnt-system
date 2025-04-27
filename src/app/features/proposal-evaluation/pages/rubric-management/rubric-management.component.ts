import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatTableModule } from "@angular/material/table"
import { MatSortModule } from "@angular/material/sort"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { MatChipsModule } from "@angular/material/chips"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import { MatMenuModule } from "@angular/material/menu"
import {ChangeDetectionStrategy} from '@angular/core';
import  { EvaluationRubricService } from "../../services/evaluation-rubric.service"
import  { EvaluationRubricResponse } from "../../models/evaluation-rubrics.model"
import  { NotificationService } from "../../../project/services/notification.service"
import { AddEditRubricDialogComponent } from "../../components/add-edit-rubric-dialog/add-edit-rubric-dialog.component"
import { ConfirmDialogComponent } from "../../../../components/confirm-dialog/confirm-dialog.component"

@Component({
  selector: "app-rubric-management",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
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
    MatMenuModule,
    CommonModule,
    // ReactiveFormsModule,
    MatInputModule,
    // MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    // MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: "./rubric-management.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RubricManagementComponent implements OnInit {
  rubrics: EvaluationRubricResponse[] = []
  filteredRubrics: EvaluationRubricResponse[] = []

  searchTerm = ""
  statusFilter = ""
  sortBy = "name"
  loading = false

  constructor(
    private rubricService: EvaluationRubricService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadRubrics()
  }

  loadRubrics(): void {
    this.loading = true
    this.rubricService.getAllRubrics().subscribe({
      next: (rubrics) => {
        this.rubrics = rubrics
        this.applyFilter()
        this.loading = false
      },
      error: (err) => {
        this.notificationService.error("Failed to load rubrics")
        this.loading = false
      },
    })
  }

  applyFilter(): void {
    let filtered = [...this.rubrics]

    // Apply search filter
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (rubric) =>
          rubric.name.toLowerCase().includes(searchTermLower) ||
          rubric.description.toLowerCase().includes(searchTermLower),
      )
    }

    // Apply status filter
    if (this.statusFilter) {
      filtered = filtered.filter((rubric) => rubric.status === this.statusFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (this.sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (this.sortBy === "status") {
        return a.status.localeCompare(b.status)
      } else if (this.sortBy === "version") {
        return a.version.localeCompare(b.version)
      }
      return 0
    })

    this.filteredRubrics = filtered
  }

  clearFilters(): void {
    this.searchTerm = ""
    this.statusFilter = ""
    this.sortBy = "name"
    this.applyFilter()
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AddEditRubricDialogComponent, {
      width: "600px",
      data: { isEdit: false },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rubricService.createRubric(result).subscribe({
          next: () => {
            this.notificationService.success("Rubric created successfully")
            this.loadRubrics()
          },
          error: (err) => {
            this.notificationService.error("Failed to create rubric")
          },
        })
      }
    })
  }

  editRubric(rubric: EvaluationRubricResponse): void {
    const dialogRef = this.dialog.open(AddEditRubricDialogComponent, {
      width: "600px",
      data: {
        isEdit: true,
        rubric: rubric,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rubricService.updateRubric(rubric.publicId, result).subscribe({
          next: () => {
            this.notificationService.success("Rubric updated successfully")
            this.loadRubrics()
          },
          error: (err) => {
            this.notificationService.error("Failed to update rubric")
          },
        })
      }
    })
  }

  duplicateRubric(rubric: EvaluationRubricResponse): void {
    const duplicateRubric = {
      name: `${rubric.name} (Copy)`,
      description: rubric.description,
      documentPassingScore: rubric.documentPassingScore,
      presentationPassingScore: rubric.presentationPassingScore,
      sections: rubric.sections,
    }

    this.rubricService.createRubric(duplicateRubric).subscribe({
      next: () => {
        this.notificationService.success("Rubric duplicated successfully")
        this.loadRubrics()
      },
      error: (err) => {
        this.notificationService.error("Failed to duplicate rubric")
      },
    })
  }

  deleteRubric(rubric: EvaluationRubricResponse): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Rubric",
        message: `Are you sure you want to delete the rubric "${rubric.name}"? This action cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmColor: "warn",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rubricService.deleteRubric(rubric.publicId).subscribe({
          next: () => {
            this.notificationService.success("Rubric deleted successfully")
            this.loadRubrics()
          },
          error: (err) => {
            this.notificationService.error("Failed to delete rubric")
          },
        })
      }
    })
  }
}
