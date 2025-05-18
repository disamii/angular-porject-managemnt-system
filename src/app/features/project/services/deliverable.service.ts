import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeliverableRequest, DeliverableResponse, Milestone } from '../models/deliverable.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliverableService {
  private baseUrl = '/api/v1/milestones';

  private milestones: Milestone[] = [
    {
      id: 1,
      name: "Initial Research",
      status: "COMPLETED"
    },
    {
      id: 2,
      name: "Prototype Development",
      status: "IN_PROGRESS"
    },
    {
      id: 3,
      name: "User Testing",
      status: "NOT_STARTED"
    }
  ];

  private deliverables: DeliverableResponse[] = [
    {
      id: 1,
      publicId: 'DELIV-001',
      name: "Research Report",
      description: "A comprehensive report on the initial research findings.",
      reviewStatus: 'PENDING_REVIEW',
      reviewComments: '',
      dueDate: '2025-05-10',
      submissionDate: '2025-04-20',
      reviewed: true,
      milestone: this.milestones[0]
    },
    {
      id: 2,
      publicId: 'DELIV-002',
      name: "Prototype Design",
      description: "The first draft of the prototype design.",
      reviewStatus: 'PENDING_REVIEW',
      reviewComments: '',
      dueDate: '2025-05-15',
      submissionDate: '2025-04-25',
      reviewed: false,
      milestone: this.milestones[0]
    },
    {
      id: 3,
      publicId: 'DELIV-003',
      name: "User Testing Results",
      description: "Results and feedback collected from user testing.",
      reviewStatus: 'PENDING_REVIEW',
      reviewComments: '',
      dueDate: '2025-05-20',
      submissionDate: '2025-04-28',
      reviewed: false,
      milestone: this.milestones[0]
    }
  ];

  constructor(private http: HttpClient) {}

  getDeliverables(milestoneId: number): Observable<DeliverableResponse[]> {
    const filteredDeliverables = this.deliverables.filter(deliverable => deliverable.milestone.id === milestoneId);
    return of(filteredDeliverables);

    // return this.http.get<DeliverableResponse[]>(`${this.baseUrl}/${milestoneId}/deliverables`);
  }

  createDeliverable(milestoneId: number, deliverable: DeliverableRequest): Observable<DeliverableResponse | undefined> {
    const newDeliverable: DeliverableResponse = {
      ...deliverable,
      id: this.deliverables.length + 1,
      publicId: `DELIV-${String(this.deliverables.length + 1).padStart(3, '0')}`,
      reviewed: false,
      reviewStatus: 'PENDING_REVIEW',
      reviewComments: '',
      dueDate: '2025-06-01', // Mock value – you can use deliverable.dueDate if it's available
      submissionDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD
      milestone: this.milestones.find(m => m.id === milestoneId)!
    };
    this.deliverables.push(newDeliverable);
    return of(newDeliverable);
  
    // return this.http.post<DeliverableResponse>(`${this.baseUrl}/${milestoneId}/deliverables`, deliverable);
  }
  
  uploadAttachments(milestoneId: number, deliverableId: number, attachments: any): Observable<any> {
    return of({ message: 'Mock upload successful' });

    // return this.http.post(`${this.baseUrl}/${milestoneId}/deliverables/${deliverableId}/upload-attachments`, attachments);
  }

  updateReviewStatus(milestoneId: number, deliverableId: number, status: boolean): Observable<any> {
    const deliverable = this.deliverables.find(d =>
      d.milestone.id === milestoneId && d.id === deliverableId
    );
    if (deliverable) {
      deliverable.reviewed = status;
      deliverable.reviewStatus = status ? 'APPROVED' : 'PENDING_REVIEW';
    }
    return of({ success: true });

    // return this.http.patch(`${this.baseUrl}/${milestoneId}/deliverables/${deliverableId}/review-status`, { reviewed: status });
  }

  downloadDeliverable(milestoneId: number, publicId: string): Observable<Blob> {
    const blob = new Blob([`Mock content of deliverable ${publicId}`], { type: 'text/plain' });
    return of(blob);

    // return this.http.get(`${this.baseUrl}/${milestoneId}/deliverables/${publicId}/download`, { responseType: 'blob' });
  }

  getDeliverable(milestoneId: number, deliverableId: number): Observable<DeliverableResponse> {
    const deliverable = this.deliverables.find(d =>
      d.milestone.id === milestoneId && d.id === deliverableId
    );
    return of(deliverable as DeliverableResponse);

    // return this.http.get<DeliverableResponse>(`${this.baseUrl}/${milestoneId}/deliverables/${deliverableId}`);
  }

  deleteDeliverable(milestoneId: number, deliverableId: number): Observable<void> {
    const index = this.deliverables.findIndex(d =>
      d.milestone.id === milestoneId && d.id === deliverableId
    );
    if (index !== -1) {
      this.deliverables.splice(index, 1);
    }
    return of(undefined);

    // return this.http.delete<void>(`${this.baseUrl}/${milestoneId}/deliverables/${deliverableId}`);
  }
}
