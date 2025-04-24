import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import type { Person } from "../models/task.model"

@Injectable({
  providedIn: "root",
})
export class PersonService {
  // In a real app, this would be an API endpoint
  private mockPeople: Person[] = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com" },
    { id: 3, firstName: "Bob", lastName: "Johnson", email: "bob@example.com" },
  ]

  constructor(private http: HttpClient) {}

  // In a real app, this would call an API
  getPeople(): Observable<Person[]> {
    // Mock implementation - replace with actual API call in production
    return of(this.mockPeople)
  }
}
