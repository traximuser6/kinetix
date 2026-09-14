import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  // ============================================================
  // DEPENDENCY INJECTION
  // ============================================================

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  // ============================================================
  // CLEANUP
  // ============================================================

  private readonly destroy$ = new Subject<void>();

  // ============================================================
  // FORM
  // ============================================================

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  // ============================================================
  // UI STATE
  // ============================================================

  showPassword = false;
  isLoading = false;
  errorMessage = '';
  submitted = false;

  // ============================================================
  // GETTERS
  // ============================================================

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  get remember() {
    return this.loginForm.controls.remember;
  }

  get isUsernameInvalid(): boolean {
    return this.username.invalid &&
      (this.username.touched || this.submitted);
  }

  get isPasswordInvalid(): boolean {
    return this.password.invalid &&
      (this.password.touched || this.submitted);
  }

  // ============================================================
  // FORM SUBMISSION
  // ============================================================

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    // Validate form
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Prevent multiple submissions
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    // Because the form is nonNullable,
    // remember is guaranteed to be boolean.
    const { username, password, remember } = this.loginForm.getRawValue();

    this.auth
      .login(username, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (success: boolean) => {
          this.isLoading = false;

          if (success) {
            this.router.navigate(['/']);
          } else {
            this.errorMessage =
              'Invalid credentials. Please try again.';

            // Clear password after failed login
            this.password.reset();
          }
        },

        error: (error) => {
          this.isLoading = false;

          this.errorMessage =
            error?.error?.message ||
            error?.message || 'Something went wrong. Please try again.';
        },
      });
  }

  // ============================================================
  // UI ACTIONS
  // ============================================================

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clearError(): void {
    this.errorMessage = '';
  }

  // ============================================================
  // LIFECYCLE
  // ============================================================

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
