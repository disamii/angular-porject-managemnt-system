import { Component, Inject, type OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import type { EvaluatorRequest, EvaluatorResponse } from "../../models/evaluator.model";
import { Person } from "../../models/person.model";
import { PersonService } from "../../services/person.service";

export interface AddEditEvaluatorDialogData {
  evaluator?: EvaluatorResponse;
  isEdit: boolean;
}

@Component({
  selector: "app-add-edit-evaluator-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: "./add-edit-evaluator-dialog.component.html",
})
export class AddEditEvaluatorDialogComponent implements OnInit {
  evaluatorForm: FormGroup;
  dialogTitle: string;
  submitButtonText: string;
  users: Person[] = []; 

  evaluatorTypes = [
    { value: "DOCUMENT_REVIEWER", label: "Document Reviewer" },
    { value: "PRESENTATION_REVIEWER", label: "Presentation Reviewer" },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditEvaluatorDialogComponent>,
    private userService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: AddEditEvaluatorDialogData
  ) {

    this.dialogTitle = data.isEdit ? "Edit Evaluator" : "Add New Evaluator";
    this.submitButtonText = data.isEdit ? "Update" : "Create";

    this.evaluatorForm = this.fb.group({
      userId: [data.evaluator ? data.evaluator.evaluator?.id : null, Validators.required],
      expertise: [data.evaluator ? data.evaluator.expertise : "", Validators.required],
      maxAssignments: [data.evaluator ? data.evaluator.maxAssignments : 1, [Validators.required, Validators.min(1)]],
      type: [data.evaluator ? data.evaluator.type : "DOCUMENT_REVIEWER", Validators.required],
    });
    
  }

  ngOnInit(): void {
    this.userService.getPeople().subscribe(users => {
      this.users = users;
    });
    this.initForm();
  }

  initForm(): void {
    if (this.data.evaluator) {
      this.evaluatorForm.patchValue({
        userId: this.data.evaluator.evaluator.id,
        expertise: this.data.evaluator.expertise,
        maxAssignments: this.data.evaluator.maxAssignments,
        type: this.data.evaluator.type,
      });
    }
  }

  onSubmit(): void {
    if (this.evaluatorForm.invalid) {
      return;
    }

    const formValue = this.evaluatorForm.value;

    const request: EvaluatorRequest = {
      userId: formValue.userId,
      expertise: formValue.expertise,
      maxAssignments: formValue.maxAssignments,
      type: formValue.type,
    };

    this.dialogRef.close(request);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
