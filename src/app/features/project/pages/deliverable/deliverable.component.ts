import { Component, type OnInit } from "@angular/core"
import  { Deliverable } from "../../models/deliverable.model"
import  { DeliverableService } from "../../services/deliverable.service"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar"
import {  ActivatedRoute, RouterModule } from "@angular/router"
import  { MatDialog } from "@angular/material/dialog"
import { MilestoneDeliverableFormComponent } from "../../components/milestone-deliverable/milestone-deliverable-form.component"
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component"

@Component({
  selector: "app-deliverable-list",
  templateUrl: "./deliverable-list.component.html",
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
})
export class DeliverableListComponent implements OnInit {
  deliverables: Deliverable[] = []
  milestoneId = 0
  loading = false
  error = false

  constructor(
    private deliverableService: DeliverableService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("milestoneId")
      if (id) {
        this.milestoneId = +id
        this.loadDeliverables()
      }
    })
  }

  loadDeliverables(): void {
    this.loading = true
    this.error = false
    this.deliverableService.getDeliverables(this.milestoneId).subscribe({
      next: (deliverables) => {
        this.deliverables = deliverables
        this.loading = false
      },
      error: (err) => {
        console.error("Failed to load deliverables", err)
        this.error = true
        this.loading = false
        this.showSnackBar("Failed to load deliverables")
      },
    })
  }

  openAddDeliverableModal(): void {
    const dialogRef = this.dialog.open(MilestoneDeliverableFormComponent, {
      width: "600px",
      data: { milestoneId: this.milestoneId, isEditing: false },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "refresh") {
        this.loadDeliverables()
      }
    })
  }

  openEditDeliverableModal(deliverable: Deliverable): void {
    const dialogRef = this.dialog.open(MilestoneDeliverableFormComponent, {
      width: "600px",
      data: {
        milestoneId: this.milestoneId,
        deliverable: deliverable,
        isEditing: true,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "refresh") {
        this.loadDeliverables()
      }
    })
  }

  confirmDeleteDeliverable(deliverableId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Delete Deliverable",
        message: "Are you sure you want to delete this deliverable? This action cannot be undone.",
        confirmText: "Delete",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDeliverable(deliverableId)
      }
    })
  }

  deleteDeliverable(deliverableId: number): void {
    this.loading = true
    this.deliverableService.deleteDeliverable(this.milestoneId, deliverableId).subscribe({
      next: () => {
        this.showSnackBar("Deliverable deleted successfully")
        this.loadDeliverables() // Refresh the list after deletion
      },
      error: (err) => {
        console.error("Failed to delete deliverable", err)
        this.showSnackBar("Failed to delete deliverable")
        this.loading = false
      },
    })
  }

  downloadDeliverable(publicId: string): void {
    this.loading = true
    this.deliverableService.downloadDeliverable(this.milestoneId, publicId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `deliverable-${publicId}.pdf` // Assuming PDF format
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        this.loading = false
        this.showSnackBar("Deliverable downloaded successfully")
      },
      error: (err) => {
        console.error("Failed to download deliverable", err)
        this.showSnackBar("Failed to download deliverable")
        this.loading = false
      },
    })
  }

  toggleReviewStatus(deliverable: Deliverable): void {
    const newStatus = !deliverable.reviewed
    this.loading = true
    this.deliverableService.updateReviewStatus(this.milestoneId, deliverable.id, newStatus).subscribe({
      next: () => {
        deliverable.reviewed = newStatus
        this.showSnackBar(`Deliverable marked as ${newStatus ? "reviewed" : "not reviewed"}`)
        this.loading = false
      },
      error: (err) => {
        console.error("Failed to update review status", err)
        this.showSnackBar("Failed to update review status")
        this.loading = false
      },
    })
  }

  uploadAttachments(deliverableId: number, files: FileList): void {
    if (!files || files.length === 0) {
      this.showSnackBar("No files selected")
      return
    }

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }

    this.loading = true
    this.deliverableService.uploadAttachments(this.milestoneId, deliverableId, formData).subscribe({
      next: () => {
        this.showSnackBar("Attachments uploaded successfully")
        this.loadDeliverables() // Refresh to show new attachments
        this.loading = false
      },
      error: (err) => {
        console.error("Failed to upload attachments", err)
        this.showSnackBar("Failed to upload attachments")
        this.loading = false
      },
    })
  }

  getDeliverableDetails(deliverableId: number): void {
    this.loading = true
    this.deliverableService.getDeliverable(this.milestoneId, deliverableId).subscribe({
      next: (deliverable) => {
        // Could open a dialog to show details or navigate to a details page
        console.log("Deliverable details:", deliverable)
        this.loading = false
      },
      error: (err) => {
        console.error("Failed to get deliverable details", err)
        this.showSnackBar("Failed to get deliverable details")
        this.loading = false
      },
    })
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    })
  }

  // Helper method to trigger file input click
  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click()
  }

  // Handle file selection
  onFileSelected(event: Event, deliverableId: number): void {
    const element = event.target as HTMLInputElement
    const files = element.files
    if (files) {
      this.uploadAttachments(deliverableId, files)
    }
  }
}
