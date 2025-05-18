import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, ActivatedRoute, Router } from "@angular/router"
import { DeliverableService } from "../../services/deliverable.service"
import { DeliverableResponse } from "../../models/deliverable.model"

// Angular Material Imports
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MilestoneDeliverableFormComponent } from "../milestone-deliverable/milestone-deliverable-form.component"
import { MatDialog } from "@angular/material/dialog"

@Component({
  selector: "app-deliverable-detail",
  templateUrl: "./deliverable-detail.component.html",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
})
export class DeliverableDetailComponent implements OnInit {
  milestoneId = 0
  deliverableId = 0
  deliverable: DeliverableResponse | null = null
  loading = true
  error: string | null = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deliverableService: DeliverableService,
    private dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.milestoneId = +params["milestoneId"]
      this.deliverableId = +params["deliverableId"]
      this.loadDeliverable()
    })
  }

  loadDeliverable(): void {
    this.loading = true
    this.deliverableService.getDeliverable(this.milestoneId, this.deliverableId).subscribe({
      next: (deliverable) => {
        this.deliverable = deliverable
        console.log(deliverable)
        this.loading = false
      },
      error: (err) => {
        this.error = "Failed to load deliverable details. Please try again."
        this.loading = false
        console.error("Error loading deliverable:", err)
      }
    })
  }

  navigateToDeliverableList(): void {
    this.router.navigate(["/milestones", this.milestoneId, "deliverables"])
  }


  openEditDeliverableModal(deliverable: DeliverableResponse): void {
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
        this.loadDeliverable()
      }
    })
  }


  deleteDeliverable(): void {
    if (!confirm("Are you sure you want to delete this deliverable?")) return

    this.deliverableService.deleteDeliverable(this.milestoneId, this.deliverableId).subscribe({
      next: () => this.navigateToDeliverableList(),
      error: (err) => {
        this.error = "Failed to delete deliverable."
        console.error("Error deleting deliverable:", err)
      }
    })
  }
}
