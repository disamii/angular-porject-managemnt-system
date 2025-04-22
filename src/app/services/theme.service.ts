import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

export type ThemeMode = "light" | "dark" | "system"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private themeModeSubject = new BehaviorSubject<ThemeMode>(this.getInitialThemeMode())
  themeMode$ = this.themeModeSubject.asObservable()

  private isDarkModeSubject = new BehaviorSubject<boolean>(this.getInitialIsDarkMode())
  isDarkMode$ = this.isDarkModeSubject.asObservable()

  constructor() {
    // Listen for system preference changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQuery.addEventListener("change", (e) => {
        if (this.themeModeSubject.value === "system") {
          this.isDarkModeSubject.next(e.matches)
          this.applyTheme(e.matches)
        }
      })
    }
  }

  setThemeMode(mode: ThemeMode): void {
    this.themeModeSubject.next(mode)
    localStorage.setItem("themeMode", mode)

    let isDark: boolean
    if (mode === "system") {
      isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    } else {
      isDark = mode === "dark"
    }

    this.isDarkModeSubject.next(isDark)
    this.applyTheme(isDark)
  }

  private getInitialThemeMode(): ThemeMode {
    const savedMode = localStorage.getItem("themeMode") as ThemeMode
    return savedMode || "system"
  }

  private getInitialIsDarkMode(): boolean {
    const mode = this.getInitialThemeMode()
    if (mode === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return mode === "dark"
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }
}
