import { Component, type OnInit } from "@angular/core"
import {  FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { NgModule } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"

import  { UserService } from "../../services/user.service"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatTabsModule } from "@angular/material/tabs"
import { MatBadgeModule } from "@angular/material/badge"
import { MatChipsModule } from "@angular/material/chips"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatMenuModule } from "@angular/material/menu"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatListModule } from "@angular/material/list"
import { MatDividerModule } from "@angular/material/divider"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatRadioModule } from "@angular/material/radio"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDialogModule } from "@angular/material/dialog"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSortModule } from "@angular/material/sort"
import { MatExpansionModule } from "@angular/material/expansion"
import { MatStepperModule } from "@angular/material/stepper"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatAutocompleteModule } from "@angular/material/autocomplete"
import { MatGridListModule } from "@angular/material/grid-list"
import { MatRippleModule } from "@angular/material/core"
import { MatBottomSheetModule } from "@angular/material/bottom-sheet"
import { CommonModule } from '@angular/common';  // Ensure CommonModule is imported
import { User } from "../../../../../models/user.model"

@Component({
  selector: "app-settings",
  standalone:true,
  templateUrl: "./settings.component.html",
  imports: [
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatBadgeModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatRippleModule,
    MatBottomSheetModule,
  ],
  // styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  currentUser!: User
  profileForm!: FormGroup
  securityForm!: FormGroup

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user

      this.profileForm = this.fb.group({
        firstName: [this.currentUser.name.split(" ")[0], Validators.required],
        lastName: [this.currentUser.name.split(" ")[1], Validators.required],
        email: [this.currentUser.email, [Validators.required, Validators.email]],
        jobTitle: [this.currentUser.role, Validators.required],
        bio: [
          "Experienced project manager with over 5 years of experience in leading cross-functional teams and delivering successful projects on time and within budget.",
          Validators.required,
        ],
      })

      this.securityForm = this.fb.group(
        {
          currentPassword: ["", Validators.required],
          newPassword: ["", [Validators.required, Validators.minLength(8)]],
          confirmPassword: ["", Validators.required],
        },
        { validator: this.passwordMatchValidator },
      )
    })
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("newPassword")?.value === g.get("confirmPassword")?.value ? null : { mismatch: true }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      console.log("Profile saved:", this.profileForm.value)
      // In a real app, you would send this data to your API
    }
  }

  updatePassword() {
    if (this.securityForm.valid) {
      console.log("Password updated:", this.securityForm.value)
      // In a real app, you would send this data to your API
    }
  }
}
