import { Component, type OnInit, type OnDestroy, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { FormControl, ReactiveFormsModule } from "@angular/forms"
import { MatTableModule, MatTable } from "@angular/material/table"
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator"
import { MatSortModule, MatSort } from "@angular/material/sort"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import { MatSelectModule } from "@angular/material/select"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatMenuModule } from "@angular/material/menu"

import { Subject } from "rxjs"
import { takeUntil, debounceTime, distinctUntilChanged } from "rxjs/operators"

import  { EvaluatorService } from "../../services/evaluator.service"
import  { EvaluatorResponse } from "../../models/evaluator.model"
import  { NotificationService } from "../../services/notification.service"
import { ConfirmDialogComponent } from "../../../../components/confirm-dialog/confirm-dialog.component"
import { EvaluatorFormComponent } from "../../components/evaluator-form/evaluator-form.component"

@Component({
  selector: "app-evaluator-management",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatMenuModule,
    EvaluatorFormComponent,
  ],
  templateUrl: "./evaluator-management.component.html",
})
export class EvaluatorManagementComponent implements OnInit, OnDestroy {
  evaluators: EvaluatorResponse[] = []
  filteredEvaluators: EvaluatorResponse[] = []
  displayedColumns: string[] = [
    "name",
    "email",
    "organization",
    "type",
    "expertise",
    "status",
    "assignments",
    "actions",
  ]

  loading = true
  searchControl = new FormControl("")
  typeFilter = new FormControl("")
  statusFilter = new FormControl("")

  showAddForm = false
  editingEvaluator: EvaluatorResponse | null = null

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatTable) table!: MatTable<EvaluatorResponse>

  private destroy$ = new Subject<void>()

  constructor(
    private evaluatorService: EvaluatorService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadEvaluators()
    this.setupFilters()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  setupFilters(): void {
    // Search filter
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.applyFilters()
      })

    // Type filter
    this.typeFilter.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.applyFilters()
    })

    // Status filter
    this.statusFilter.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.applyFilters()
    })
  }

  loadEvaluators(): void {
    this.loading = true
    this.evaluatorService
      .getEvaluators()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (evaluators) => {
          this.evaluators = evaluators
          this.applyFilters()
          this.loading = false
        },
        error: (error) => {
          this.notificationService.error("Failed to load evaluators")
          this.loading = false
        },
      })
  }

  applyFilters(): void {
    let filtered = this.evaluators

    // Apply search filter
    const searchTerm = this.searchControl.value?.toLowerCase() || ""
    if (searchTerm) {
      filtered = filtered.filter(
        (evaluator) =>
          evaluator.name.toLowerCase().includes(searchTerm) ||
          evaluator.email.toLowerCase().includes(searchTerm) ||
          evaluator.organization.toLowerCase().includes(searchTerm) ||
          evaluator.expertise.some((e) => e.toLowerCase().includes(searchTerm)),
      )
    }

    // Apply type filter
    const typeFilter = this.typeFilter.value
    if (typeFilter) {
      filtered = filtered.filter((evaluator) => evaluator.type === typeFilter)
    }

    // Apply status filter
    const statusFilter = this.statusFilter.value
    if (statusFilter !== null && statusFilter !== undefined) {
      const isActive = statusFilter === "active"
      filtered = filtered.filter((evaluator) => evaluator.isActive === isActive)
    }

    this.filteredEvaluators = filtered

    // Reset pagination when filters change
    if (this.paginator) {
      this.paginator.firstPage()
    }
  }

  resetFilters(): void {
    this.searchControl.setValue("")
    this.typeFilter.setValue("")
    this.statusFilter.setValue("")
  }

  showAddEvaluatorForm(): void {
    this.showAddForm = true
    this.editingEvaluator = null
  }

  hideAddEvaluatorForm(): void {
    this.showAddForm = false
    this.editingEvaluator = null
  }

  saveNewEvaluator(evaluatorData: any): void {
    this.evaluatorService
      .createEvaluator(evaluatorData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.success("Evaluator added successfully")
          this.loadEvaluators()
          this.hideAddEvaluatorForm()
        },
        error: (error) => {
          this.notificationService.error("Failed to add evaluator")
        },
      })
  }

  editEvaluator(evaluator: EvaluatorResponse): void {
    this.editingEvaluator = evaluator
    this.showAddForm = true
  }

  updateEvaluator(evaluatorData: any): void {
    if (!this.editingEvaluator) return

    this.evaluatorService
      .updateEvaluator(this.editingEvaluator.publicId, evaluatorData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.success("Evaluator updated successfully")
          this.loadEvaluators()
          this.hideAddEvaluatorForm()
        },
        error: (error) => {
          this.notificationService.error("Failed to update evaluator")
        },
      })
  }

  toggleEvaluatorStatus(evaluator: EvaluatorResponse): void {
    const newStatus = !evaluator.isActive
    const action = newStatus ? "activate" : "deactivate"

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Evaluator`,
        message: `Are you sure you want to ${action} ${evaluator.name}?`,
        confirmText: "Yes",
        cancelText: "No",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.evaluatorService
          .updateEvaluator(evaluator.publicId, {
            ...evaluator,
            isActive: newStatus,
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.notificationService.success(`Evaluator ${action}d successfully`)
              this.loadEvaluators()
            },
            error: (error) => {
              this.notificationService.error(`Failed to ${action} evaluator`)
            },
          })
      }
    })
  }

  deleteEvaluator(evaluator: EvaluatorResponse): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Evaluator",
        message: `Are you sure you want to delete ${evaluator.name}? This action cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmColor: "warn",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.evaluatorService
          .deleteEvaluator(evaluator.publicId)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.notificationService.success("Evaluator deleted successfully")
              this.loadEvaluators()
            },
            error: (error) => {
              this.notificationService.error("Failed to delete evaluator")
            },
          })
      }
    })
  }

  viewEvaluatorDetails(evaluator: EvaluatorResponse): void {
    this.router.navigate(["/evaluation/evaluators", evaluator.publicId])
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case "INTERNAL":
        return "Internal"
      case "EXTERNAL":
        return "External"
      case "SUBJECT_MATTER_EXPERT":
        return "Subject Matter Expert"
      default:
        return type
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case "INTERNAL":
        return "primary"
      case "EXTERNAL":
        return "accent"
      case "SUBJECT_MATTER_EXPERT":
        return "warn"
      default:
        return ""
    }
  }
}
