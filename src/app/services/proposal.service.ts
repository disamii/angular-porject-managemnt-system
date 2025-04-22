import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { ResearchProposal } from '../models/project.model'

@Injectable({ providedIn: 'root' })
export class ProposalService {
  private mockProposals: ResearchProposal[] = [
    { id: 1, title: 'AI in Agriculture' },
    { id: 2, title: 'Climate Change Impact Study' },
    { id: 3, title: 'Blockchain for Healthcare' },
  ]

  getProposals(): Observable<ResearchProposal[]> {
    return of(this.mockProposals)
  }
}
