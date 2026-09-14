import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: false,
  });

  showPassword = false;
  isLoading = false;
  errorMessage = '';
  submitted = false;

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  get remember() {
    return this.loginForm.controls.remember;
  }

  get isUsernameInvalid() {
    return this.username.invalid && (this.username.touched || this.submitted);
  }

  get isPasswordInvalid() {
    return this.password.invalid && (this.password.touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid || this.isLoading) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();
    this.isLoading = true;

    this.auth.login(username, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: success => {
          this.isLoading = false;

          if (success) {
            this.router.navigate(['/']);
            return;
          }

          this.errorMessage = 'Invalid credentials. Please try again.';
          this.password.reset();
        },
        error: error => {
          this.isLoading = false;
          this.errorMessage =
            error?.error?.message ||
            error?.message ||
            'Something went wrong. Please try again.';
        },
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  clearError(): void {
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
