import { Component, type OnInit } from "@angular/core"
import  { Router, RouterModule } from "@angular/router"

import type { Observable } from "rxjs"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatMenuModule } from "@angular/material/menu"
import { CommonModule } from '@angular/common';  
import { MatButtonModule } from "@angular/material/button"
import { User } from "../../features/users/user.model"
import { AuthService } from "../../features/project/services/auth.service"
import { ThemeService } from "../../features/project/services/theme.service"
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],

})
export class HeaderComponent implements OnInit {
  isAuthenticated = false
  currentUser: User | null = null
  isDarkMode$: Observable<boolean>

  constructor(
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService,
  ) {
    this.isDarkMode$ = this.themeService.isDarkMode$
  }

  ngOnInit(): void {
    this.authService.authState$.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated
      this.currentUser = state.user
    })
  }

  isActive(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + "/")
  }

  toggleTheme(): void {
    this.isDarkMode$.subscribe((isDark) => {
      this.themeService.setThemeMode(isDark ? "light" : "dark")
    })
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(["/"])
    })
  }
}
