import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { delay, tap } from "rxjs/operators"
import { User } from "../../../../models/user.model"

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
  })

  authState$ = this.authState.asObservable()

  constructor() {
    // Check if user is already logged in (e.g., from localStorage)
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        this.authState.next({
          isAuthenticated: true,
          user,
          loading: false,
        })
      } catch (e) {
        localStorage.removeItem("user")
      }
    }
  }

  login(email: string, password: string): Observable<User> {
    this.authState.next({
      ...this.authState.value,
      loading: true,
    })

    // Simulate API call
    return of({
      id: 1,
      name: "John Doe",
      email: email,
      role: "Project Manager",
      avatar: "/assets/images/avatar1.svg",
    }).pipe(
      delay(1000),
      tap((user) => {
        localStorage.setItem("user", JSON.stringify(user))
        this.authState.next({
          isAuthenticated: true,
          user,
          loading: false,
        })
      }),
    )
  }

  logout(): Observable<boolean> {
    localStorage.removeItem("user")
    this.authState.next({
      isAuthenticated: false,
      user: null,
      loading: false,
    })
    return of(true)
  }

  isAuthenticated(): boolean {
    return this.authState.value.isAuthenticated
  }

  getCurrentUser(): User | null {
    return this.authState.value.user
  }
}
