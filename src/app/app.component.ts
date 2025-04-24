import { Component, type OnInit } from "@angular/core";
import { Router, NavigationEnd, RouterModule, } from "@angular/router";
import { RouterOutlet } from '@angular/router'
import { filter } from "rxjs/operators"
import { FooterComponent } from "./components/footer/footer.component"
import { ThemeService } from "./features/project/services/theme.service"
import { HeaderComponent } from "./components/header/header.component"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ],

})
export class AppComponent implements OnInit {
  title = "Project Management"

  constructor(
    private router: Router,
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    // Apply theme on app initialization
    this.themeService.isDarkMode$.subscribe((isDark) => {
      if (isDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    })

    // Scroll to top on route change
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0)
    })
  }
}

