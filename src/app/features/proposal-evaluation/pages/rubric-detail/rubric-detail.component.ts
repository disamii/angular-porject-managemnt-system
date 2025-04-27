import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  ActivatedRoute,  Router, RouterModule } from "@angular/router"
import {  FormBuilder, type FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatTabsModule } from "@angular/material/tabs"
import { MatExpansionModule } from "@angular/material/expansion"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatSliderModule } from "@angular/material/slider"
import { MatChipsModule } from "@angular/material/chips"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatMenuModule } from "@angular/material/menu"
import { type CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop"

import  { EvaluationRubricService } from "../../services/evaluation-rubric.service"
import  { RubricSectionService } from "../../services/rubric-section.service"
import  {
  EvaluationRubricResponse,
  Section,
  Criterion,
  EvaluationRubricUpdateRequest,
} from "../../models/evaluation-rubrics.model"
import  { NotificationService } from "../../services/notification.service"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { AddEditRubricDialogComponent } from "../../components/add-edit-rubric-dialog/add-edit-rubric-dialog.component"
import { AddSectionDialogComponent } from "../../components/add-section-dialog/add-section-dialog.component"
import { CriterionScoreFormComponent } from "../../components/criterion-score-form/criterion-score-form.component"
import { AddEditCriterionDialogComponent } from "../../components/add-edit-criterion/add-edit-criterion.component"
import { EvaluationCriteriaService } from "../../services/evaluation-criteria.service"

@Component({
  selector: "app-rubric-detail",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    DragDropModule,
  ],
  templateUrl: "./rubric-detail.component.html",
})
export class RubricDetailComponent implements OnInit {
  rubric!: EvaluationRubricResponse
  rubricId!: string
  editForm!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rubricService: EvaluationRubricService,
    private sectionService: RubricSectionService,
    private criterionService:EvaluationCriteriaService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.rubricId = this.route.snapshot.paramMap.get("id")!
    this.loadRubric()

    this.editForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      documentPassingScore: [70, [Validators.required, Validators.min(0), Validators.max(100)]],
      presentationPassingScore: [70, [Validators.required, Validators.min(0), Validators.max(100)]],
    })
  }

  loadRubric(): void {
    this.rubricService.getRubricByPublicId(this.rubricId).subscribe({
      next: (rubric) => {
        this.rubric = rubric!
        this.editForm.patchValue({
          name: rubric?.name,
          description: rubric?.description,
          documentPassingScore: rubric?.documentPassingScore,
          presentationPassingScore: rubric?.presentationPassingScore,
        })
      },
      error: (err) => {
        this.notificationService.error("Failed to load rubric details")
        this.router.navigate(["/evaluation/rubrics"])
      },
    })
  }
  openEditRubricDialog(): void {
    if (this.rubric && this.rubric.status !== 'ARCHIVED') {
      const dialogRef = this.dialog.open(AddEditRubricDialogComponent, {
        width: '400px',
        data: {
          rubric: this.rubric,
          isEdit: true, // Indicating that it’s for editing
        },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.rubric) {
            this.updateRubric(result);
          }
        }
      });
    }
  }
  updateRubric(rubricData: any): void {
    // Check if it's an update or creation based on the rubricData
    if (rubricData.status === 'DRAFT' || rubricData.status === 'ACTIVE') {
      this.rubricService.updateRubric(this.rubricId, rubricData).subscribe({
        next: (response) => {
          console.log('Rubric updated successfully:', response);
          // Optionally, update the local rubric data here after successful update
          this.rubric = rubricData;
          this.notificationService.success("Rubric updated successfully");
        },
        error: (err) => {
          console.error('Error updating rubric:', err);
          this.notificationService.error("Failed to update rubric");
        },
      });
    } else {
      // Handle creation logic (for a new rubric, if needed)
      this.rubricService.createRubric(rubricData).subscribe({
        next: (response) => {
          console.log('Rubric created successfully:', response);
          // Optionally, handle the new rubric after creation
          this.rubric = response;
          this.notificationService.success("Rubric created successfully");
        },
        error: (err) => {
          console.error('Error creating rubric:', err);
          this.notificationService.error("Failed to create rubric");
        },
      });
    }
  }
  

  publishRubric(): void {
    if (this.rubric.status !== "DRAFT") {
      this.notificationService.warning("Only draft rubrics can be published")
      return
    }

    if (this.rubric.sections.length === 0) {
      this.notificationService.warning("Cannot publish a rubric with no sections")
      return
    }

    const emptySections = this.rubric.sections.filter((section) => section.criteria.length === 0)
    if (emptySections.length > 0) {
      this.notificationService.warning("All sections must have at least one criterion")
      return
    }

    this.rubricService.changeRubricStatus(this.rubricId, "ACTIVE").subscribe({
      next: (updatedRubric) => {
        this.notificationService.success("Rubric published successfully")
        this.loadRubric()
      },
      error: (err) => {
        this.notificationService.error("Failed to publish rubric")
      },
    })
  }

  archiveRubric(): void {
    if (this.rubric.status !== "ACTIVE") {
      this.notificationService.warning("Only active rubrics can be archived")
      return
    }

    this.rubricService.changeRubricStatus(this.rubricId, "ARCHIVED").subscribe({
      next: (updatedRubric) => {
        this.notificationService.success("Rubric archived successfully")
        this.loadRubric()
      },
      error: (err) => {
        this.notificationService.error("Failed to archive rubric")
      },
    })
  }

  duplicateRubric(): void {
    this.notificationService.info("Duplicate functionality will be implemented here")
  }

  deleteRubric(): void {
    if (this.rubric.status === "ACTIVE") {
      this.notificationService.warning("Active rubrics cannot be deleted. Archive it first.")
      return
    }

    if (confirm(`Are you sure you want to delete the rubric "${this.rubric.name}"?`)) {
      this.rubricService.deleteRubric(this.rubricId).subscribe({
        next: () => {
          this.notificationService.success("Rubric deleted successfully")
          this.router.navigate(["/evaluation/rubrics"])
        },
        error: (err) => {
          this.notificationService.error("Failed to delete rubric")
        },
      })
    }
  }

  openAddSectionDialog(): void {
    const dialogRef = this.dialog.open(AddSectionDialogComponent, {
      width: '400px',
      data: {
        rubricId: this.rubricId,
        editMode: false, // Since this is for adding a new section
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // After the dialog is closed, we get the section data (result)
        this.addSection(result); // Call the method to add the section
      }
    });
  }
  
  addSection(newSection: any): void {
    // Send the section data to the service to add it to the rubric
    this.sectionService.addSection(this.rubricId, newSection).subscribe({
      next: (section) => {
        this.notificationService.success("Section added successfully");
        this.loadRubric(); // Reload the rubric data or update UI
      },
      error: (err) => {
        this.notificationService.error("Failed to add section");
      },
    });
  }

  editSection(section: Section): void {
    this.notificationService.info("Edit section functionality will be implemented here")
  }

  deleteSection(section: Section): void {
    if (confirm(`Are you sure you want to delete the section "${section.title}"?`)) {
      this.sectionService.deleteSection(this.rubricId, section.publicId!).subscribe({
        next: () => {
          this.notificationService.success("Section deleted successfully")
          this.loadRubric()
        },
        error: (err) => {
          this.notificationService.error("Failed to delete section")
        },
      })
    }
  }


  openAddCriterionDialog(section: Section): void {
    const newCriterion = {
      name: "",
      description: "",
      maxScore: 0,
      scoreType: "",
      condition: "",
      conditionMetScore: 0,
      conditionNotMetScore: 0,
      phase: "",
    }
  
    const dialogRef = this.dialog.open(AddEditCriterionDialogComponent, {
      width: '400px',
      data: {
        criterion: newCriterion,
        isEdit: false,
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // section.criteria.push(result);
        this.criterionService.createCriterion(result)
        this.notificationService.success("Criterion added successfully");
      }
    });
  }
  
  editCriterion(section: Section, criterion: Criterion): void {
    const dialogRef = this.dialog.open(AddEditCriterionDialogComponent, {
      width: '400px',
      data: {
        criterion: criterion,
        isEdit: true,
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.criterionService.updateCriterion(result.id,result)
        // const index = section.criteria.findIndex(c => c.id === result.criteriaId);
        // if (index !== -1) {
        //   section.criteria[index] = result;
          this.notificationService.success("Criterion updated successfully");
        // }
      }
    });
  }
  
  deleteCriterion(section: Section, criterion: Criterion): void {
    if (confirm(`Are you sure you want to delete the criterion "${criterion.name}"?`)) {
      this.criterionService.deleteCriterion(criterion.id)
      // section.criteria = section.criteria.filter((c) => c.id !== criterion.id)
      this.notificationService.success("Criterion deleted successfully")
    }
  }

  dropSection(event: CdkDragDrop<Section[]>): void {
    if (this.rubric.status === "ARCHIVED") return

    moveItemInArray(this.rubric.sections, event.previousIndex, event.currentIndex)

    this.rubric.sections.forEach((section, index) => {
      section.displayOrder = index + 1
    })

    this.notificationService.success("Section order updated")
  }

  dropCriterion(event: CdkDragDrop<Criterion[]>, section: Section): void {
    if (this.rubric.status === "ARCHIVED") return

    moveItemInArray(section.criteria, event.previousIndex, event.currentIndex)
    this.notificationService.success("Criterion order updated")
  }

  exportRubric(): void {
    this.notificationService.info("Export functionality will be implemented here")
  }

  previewRubric(): void {
    this.notificationService.info("Preview functionality will be implemented here")
  }

  createAssignment(): void {
    this.router.navigate(["/evaluation/assignments/new"], {
      queryParams: { rubricId: this.rubricId },
    })
  }
}
