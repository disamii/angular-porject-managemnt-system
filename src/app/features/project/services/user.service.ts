import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"

export interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private currentUser: User = {
    id: 1,
    name: "Samson Mamuye",
    email: "Samson@example.com",
    role: "Project Manager",
    avatar: "/assets/images/avatar1.svg",
  }

  constructor() {}

  getCurrentUser(): Observable<User> {
    return of(this.currentUser)
  }
}
