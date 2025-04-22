import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';

import { ProjectService } from './services/project.service';
import { MilestoneService } from './services/milestone.service';
import { UserService } from './services/user.service';
import { ReportService } from './services/report.service';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

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