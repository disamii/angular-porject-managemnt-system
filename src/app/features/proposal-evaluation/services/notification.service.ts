import { Injectable } from "@angular/core"
import  { MatSnackBar } from "@angular/material/snack-bar"
import { type Observable, Subject } from "rxjs"

export interface Notification {
  id: string
  message: string
  type: "success" | "error" | "warning" | "info"
  duration?: number
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private notificationsSubject = new Subject<Notification>()
  notifications$: Observable<Notification> = this.notificationsSubject.asObservable()

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration = 3000): void {
    this.showNotification({
      id: this.generateId(),
      message,
      type: "success",
      duration,
    })
  }

  error(message: string, duration = 5000): void {
    this.showNotification({
      id: this.generateId(),
      message,
      type: "error",
      duration,
    })
  }

  warning(message: string, duration = 4000): void {
    this.showNotification({
      id: this.generateId(),
      message,
      type: "warning",
      duration,
    })
  }

  info(message: string, duration = 3000): void {
    this.showNotification({
      id: this.generateId(),
      message,
      type: "info",
      duration,
    })
  }

  private showNotification(notification: Notification): void {
    this.notificationsSubject.next(notification)

    // Also show as snackbar for immediate feedback
    const panelClass = `snackbar-${notification.type}`
    this.snackBar.open(notification.message, "Close", {
      duration: notification.duration,
      panelClass: [panelClass],
      horizontalPosition: "end",
      verticalPosition: "top",
    })
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15)
  }
}
