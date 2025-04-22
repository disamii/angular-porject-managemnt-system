import { Component, OnInit, Input } from '@angular/core';
import { Deliverable } from '../../models/deliverable.model';
import { DeliverableService } from '../../services/deliverable.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MilestoneDeliverableFormComponent } from '../../components/milestone-deliverable/milestone-deliverable.component';
// import { MatDialog } from '@angular/material/dialog';
// import { MilestoneDeliverableFormComponent } from '../milestone-deliverable-form/milestone-deliverable-form.component'; // Update path if needed

@Component({
  selector: 'app-deliverable-list',
  templateUrl: './deliverable-list.component.html',
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class DeliverableListComponent implements OnInit {
  deliverables: Deliverable[] = [];
  private milestoneId: number = 0;
  constructor(
    private deliverableService: DeliverableService,
    private dialog: MatDialog,

    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('milestoneId');
      if (id) {
        this.milestoneId = +id;
        this.loadDeliverables();
      }
    });
  }
  

  loadDeliverables(): void {
    this.deliverableService.getDeliverables(this.milestoneId).subscribe({
      next: (deliverables) => {
        this.deliverables = deliverables;
      },
      error: (err) => {
        console.error('Failed to load deliverables', err);
      }
    });
  }

  deleteDeliverable(deliverableId: number): void {
    this.deliverableService.deleteDeliverable(this.milestoneId, deliverableId).subscribe({
      next: () => {
        this.loadDeliverables(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Failed to delete deliverable', err);
      }
    });
  }

  downloadDeliverable(publicId: string): void {
    this.deliverableService.downloadDeliverable(this.milestoneId, publicId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `deliverable-${publicId}.pdf`; // Assuming PDF format
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Failed to download deliverable', err);
      }
    });
  }
  openAddDeliverableModal(): void {
    const dialogRef = this.dialog.open(MilestoneDeliverableFormComponent, {
      width: '600px',
      data: { milestoneId: this.milestoneId },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadDeliverables();
      }
    });
  }
  
}
