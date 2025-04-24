import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CreateProjectDto,
  Person,
  ResearchProposal,
} from '../../models/project.model';
import { PersonService } from '../../services/person.service';
import { ProposalService } from '../../services/proposal.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MatOptionModule,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { MatSelectModule } from '@angular/material/select';
import { NotificationService } from '../../services/notification.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
  ],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  people: Person[] = [];
  proposals: ResearchProposal[] = [];
  isEditMode = false;
  projectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private proposalService: ProposalService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      requestedBudget: [0, Validators.required],
      allowedBudget: [0, Validators.required],
      principalInvestigatorId: [null, Validators.required],
      researchAdvisorId: [null, Validators.required],
      memberIds: [[]],
      researchProposalId: [null, Validators.required],
    });

    this.personService.getPeople().subscribe((res) => (this.people = res));
    this.proposalService.getProposals().subscribe((res) => (this.proposals = res));

    // Check for route param
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            this.isEditMode = true;
            this.projectId = +id;
            return this.projectService.getProject(+id);
          }
          return of(null);
        })
      )
      .subscribe((project) => {
        if (project) {
          this.projectForm.patchValue(project);
        }
      });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.notificationService.warning('Please fill in all required fields.');
      return;
    }

    const formData: CreateProjectDto = this.projectForm.value;

    if (this.isEditMode && this.projectId) {
      this.projectService.updateProject(this.projectId, formData).subscribe({
        next: () => {
          this.notificationService.success('Project updated successfully!');
          this.router.navigate(['/projects', this.projectId]);
        },
        error: () => {
          this.notificationService.error('Failed to update project.');
        },
      });
    } else {
      this.projectService.createProject(formData).subscribe({
        next: (created) => {
          this.notificationService.success('Project created successfully!');
          this.router.navigate(['/projects', created.id]);
        },
        error: () => {
          this.notificationService.error('Failed to create project.');
        },
      });
    }
  }
}
