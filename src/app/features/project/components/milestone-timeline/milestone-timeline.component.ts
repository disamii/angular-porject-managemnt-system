import { Component, Input, OnInit } from '@angular/core';
import type { Milestone } from '../../models/milestone.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-milestone-timeline',
  templateUrl: './milestone-timeline.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class MilestoneTimelineComponent implements OnInit {
  @Input() milestones: Milestone[] = [];
  selectedMilestone: Milestone | null = null;
  approvalForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.approvalForm = this.fb.group({
      note: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

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
      m.id === id ? { ...m, status: newStatus } : m
    );
  }

  openApprovalDialog(milestone: Milestone): void {
    this.selectedMilestone = milestone;
    this.approvalForm.reset(); // Clear form each time dialog opens
  }

  closeApprovalDialog(): void {
    this.selectedMilestone = null;
    this.approvalForm.reset();
  }

  handleApproval(id: number, approve: boolean): void {
    if (this.approvalForm.valid) {
      const note = this.approvalForm.get('note')?.value;
      console.log({ milestoneId: id, approve, note });
      this.closeApprovalDialog();
    }
  }
}
