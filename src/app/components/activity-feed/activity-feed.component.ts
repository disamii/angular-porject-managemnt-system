import { Component, Input } from "@angular/core"
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
export interface ActivityItem {
  id: number
  type: string
  title: string
  description: string
  timestamp: string
  icon?: string
  color?: string
}

@Component({
  selector: "app-activity-feed",
  templateUrl: "./activity-feed.component.html",
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
  // styleUrls: ["./activity-feed.component.scss"],
})
export class ActivityFeedComponent {
  @Input() activities: ActivityItem[] = []
  @Input() showViewAll = true

  getIconColor(type: string): string {
    switch (type) {
      case "milestone":
        return "bg-purple-600"
      case "comment":
        return "bg-emerald-500"
      case "approval":
        return "bg-amber-500"
      case "file":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }
}
