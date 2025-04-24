import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';
import { AuthService } from './features/project/services/auth.service';
import { MilestoneService } from './features/project/services/milestone.service';
import { NotificationService } from './features/project/services/notification.service';
import { ProjectService } from './features/project/services/project.service';
import { ReportService } from './features/project/services/report.service';
import { ThemeService } from './features/project/services/theme.service';
import { UserService } from './features/project/services/user.service';


export const appConfig: ApplicationConfig = {
  providers: [
    // Zone.js configuration (from your original)
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Enhanced router configuration
    provideRouter(
      routes,
      withDebugTracing(), // Logs all router events to console
      withEnabledBlockingInitialNavigation() // Ensures initial navigation completes
    ),
    
    // HTTP client
    provideHttpClient(),
    
    // Animations
    provideAnimations(),
    
    // Angular Material date adapter
    provideNativeDateAdapter(),
    
    // Application services
    ProjectService,
    MilestoneService,
    UserService,
    ReportService,
    NotificationService,
    AuthService,
    ThemeService
  ]
};