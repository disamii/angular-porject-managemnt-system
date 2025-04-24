import { Component, Inject, OnInit } from "@angular/core"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { PersonService } from "../../services/person.service"
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-select-person-dialog",
  standalone: true,
  templateUrl: "./select-person-dialog.component.html",
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ]
  })
export class SelectPersonDialogComponent implements OnInit {
  people: { id: number; name: string }[] = []
  selectedPersonId: number | null = null
  loading = true

  constructor(
    private personService: PersonService,
    private dialogRef: MatDialogRef<SelectPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.personService.getPeople().subscribe({
      next: (response) => {
        this.people = response.map((p) => ({
          id: p.id,
          name: `${p.firstName} ${p.lastName}`,
        }))
        this.loading = false
      },
      error: () => {
        this.loading = false
      },
    })
  }

  confirmSelection(): void {
    if (this.selectedPersonId) {
      this.dialogRef.close(this.selectedPersonId)
    }
  }

  cancel(): void {
    this.dialogRef.close(null)
  }
}
