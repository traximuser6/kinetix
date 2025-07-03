// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { postsReducer } from './app/store/posts.reducer';
import { PostsEffects } from './app/store/posts.effects';
import { ReactiveFormsModule } from '@angular/forms'; // Optional, for forms
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Optional, for toast messages
import { MatDialogModule } from '@angular/material/dialog'; // Optional, for modals
import { MatStepperModule } from '@angular/material/stepper'; // Optional, for multi-step forms

bootstrapApplication(AppComponent, {
providers: [
    provideStore({ posts: postsReducer }),
    provideEffects([PostsEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    provideRouter(routes, withComponentInputBinding(), withEnabledBlockingInitialNavigation()), // Enable blocking navigation for better initial load
    provideAnimations(), // Ensure Material animations work
    provideHttpClient(withInterceptors([])), // Add HTTP interceptors for custom headers, logging, etc.
    importProvidersFrom(ReactiveFormsModule, MatSnackBarModule, MatDialogModule, MatStepperModule), // Provide modules globally for convenience
  ]
}).catch(err => {
  console.error('Application bootstrap failed:', err);
  // Optionally, show a user-friendly error message or redirect to an error page
  // For example, you could use MatSnackBar here if imported:
  // const snackBar = inject(MatSnackBar);
  // snackBar.open('Failed to load the application. Please refresh or contact support.', 'Close', { duration: 5000 });
});