import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CreateProjectDto, Person, ResearchProposal } from '../../models/project.model'
import { PersonService } from '../../services/person.service'
import { ProposalService } from '../../services/proposal.service'
import { CommonModule } from '@angular/common'
import { MatError, MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { Router, RouterModule } from '@angular/router'
import { ProjectService } from '../../services/project.service'
import { MatSelectModule } from '@angular/material/select'
import { NotificationService } from '../../services/notification.service'  // Added notification service

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',

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
  projectForm!: FormGroup
  people: Person[] = []
  proposals: ResearchProposal[] = []

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private proposalService: ProposalService,
    private projectService: ProjectService,
    private router: Router,
    private notificationService: NotificationService // Injected notification service
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
    })

    this.personService.getPeople().subscribe((res) => (this.people = res))
    this.proposalService.getProposals().subscribe((res) => (this.proposals = res))
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const project: CreateProjectDto = this.projectForm.value;
      this.projectService.createProject(project).subscribe({
        next: (createdProject) => {
          this.notificationService.success('Project created successfully!'); 
          this.router.navigate(['/projects', createdProject.id]);
        },
        error: (err) => {
          this.notificationService.error('Failed to create project. Please try again.');
          console.error('Failed to create project', err);
        },
      });
    } else {
      this.notificationService.warning('Please fill in all required fields.'); 
    }
  }
}
