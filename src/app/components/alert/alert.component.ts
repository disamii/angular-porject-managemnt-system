import { Component, Input, Output, EventEmitter } from "@angular/core"

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
import { CommonModule } from '@angular/common';

export type AlertType = "success" | "error" | "warning" | "info"

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  imports:[
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
  ]
  // styleUrls: ["./alert.component.scss"],
})
export class AlertComponent {
  @Input() type: AlertType = "info"
  @Input() message = ""
  @Input() dismissible = true
  @Output() dismissed = new EventEmitter<void>()

  visible = true

  getAlertClass(): string {
    switch (this.type) {
      case "success":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "error":
        return "bg-red-50 text-red-700 border-red-200"
      case "warning":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "info":
      default:
        return "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

  getIconName(): string {
    switch (this.type) {
      case "success":
        return "check_circle"
      case "error":
        return "error"
      case "warning":
        return "warning"
      case "info":
      default:
        return "info"
    }
  }

  dismiss(): void {
    this.visible = false
    this.dismissed.emit()
  }
}
