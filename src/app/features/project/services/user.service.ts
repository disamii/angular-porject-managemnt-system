import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import { User } from "../../../../models/user.model"


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
