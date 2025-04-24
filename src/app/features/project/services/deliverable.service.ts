import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deliverable, Milestone } from '../models/deliverable.model';
import { Observable,of } from 'rxjs';

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
  
  private deliverables: Deliverable[] = [
    {
      id: 1,
      name: "Research Report",
      description: "A comprehensive report on the initial research findings.",
      milestone: this.milestones[0],
      reviewed: true
    },
    {
      id: 2,
      name: "Prototype Design",
      description: "The first draft of the prototype design.",
      milestone: this.milestones[0],
      reviewed: false
    },
    {
      id: 3,
      name: "User Testing Results",
      description: "Results and feedback collected from user testing.",
      milestone: this.milestones[0],
      reviewed: false
    }
  ];
  

  constructor(private http: HttpClient) {}

  getDeliverables(milestoneId: number): Observable<Deliverable[]> {
    const filteredDeliverables = this.deliverables.filter(deliverable => deliverable.milestone.id === milestoneId);
    return of(filteredDeliverables);  
  }

  // POST /api/v1/milestones/{milestoneId}/deliverables - Create a new deliverable
  createDeliverable(milestoneId: number, deliverable: Deliverable): Observable<Deliverable> {
    return this.http.post<Deliverable>(`${this.baseUrl}/${milestoneId}/deliverables`, deliverable);
  }

  // POST /api/v1/milestones/{milestoneId}/deliverables/upload-attachments - Upload attachments for a deliverable
  uploadAttachments(milestoneId: number, deliverableId: number, attachments: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${milestoneId}/deliverables/${deliverableId}/upload-attachments`, attachments);
  }

  // PATCH /api/v1/milestones/{milestoneId}/deliverables/{deliverableId}/review-status - Update deliverable review status
  updateReviewStatus(milestoneId: number, deliverableId: number, status: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${milestoneId}/deliverables/${deliverableId}/review-status`, { reviewed: status });
  }

  // GET /api/v1/milestones/{milestoneId}/deliverables/{publicId}/download - Download a deliverable
  downloadDeliverable(milestoneId: number, publicId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${milestoneId}/deliverables/${publicId}/download`, { responseType: 'blob' });
  }

  // GET /api/v1/milestones/{milestoneId}/deliverables/{deliverableId} - Get deliverable by ID
  getDeliverable(milestoneId: number, deliverableId: number): Observable<Deliverable> {
    return this.http.get<Deliverable>(`${this.baseUrl}/${milestoneId}/deliverables/${deliverableId}`);
  }

  // DELETE /api/v1/milestones/{milestoneId}/deliverables/{deliverableId} - Delete a deliverable
  deleteDeliverable(milestoneId: number, deliverableId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${milestoneId}/deliverables/${deliverableId}`);
  }
}
