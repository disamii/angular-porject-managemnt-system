import { Component, Input, OnInit } from '@angular/core';
import type { Milestone } from '../../models/milestone.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-milestone-timeline',
  templateUrl: './milestone-timeline.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatTabsModule,
  ],
})
export class MilestoneTimelineComponent implements OnInit {
  
handleApproval(arg0: number,arg1: boolean) {
throw new Error('Method not implemented.');
}
  @Input() milestones: Milestone[] = [];
  selectedMilestone: Milestone | null = null;
  approvalNote = '';

  constructor() {}

  ngOnInit(): void {}

  getStatusColor(status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'): string {
    switch (status) {
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'IN_PROGRESS':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }

  getStatusIcon(status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'): string {
    switch (status) {
      case 'COMPLETED':
        return 'check_circle';
      case 'IN_PROGRESS':
        return 'schedule';
      default:
        return 'error';
    }
  }

  getTimelineNodeClass(status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'): string {
    switch (status) {
      case 'COMPLETED':
        return 'bg-emerald-500';
      case 'IN_PROGRESS':
        return 'bg-amber-500';
      default:
        return 'bg-slate-200';
    }
  }

  handleStatusChange(id: number, newStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'): void {
    this.milestones = this.milestones.map((m) =>
      m.id === id
        ? {
            ...m,
            status: newStatus,
          }
        : m
    );
  }

  openApprovalDialog(milestone: Milestone): void {
    this.selectedMilestone = milestone;
  }

  closeApprovalDialog(): void {
    this.selectedMilestone = null;
    this.approvalNote = '';
  }
}
