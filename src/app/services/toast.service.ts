// src/app/services/toast.service.ts
import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type ToastType = 'success' | 'warning' | 'error';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private snackBar = inject(MatSnackBar);

  showToast(
    message: string,
    type: ToastType = 'success',
    action: string = '',
    config: Partial<MatSnackBarConfig> = {}
  ): void {
    const defaultConfig: MatSnackBarConfig = {
      duration: 3500,
      horizontalPosition: 'end',       // ✅ 'end' respects RTL + aligns right
      verticalPosition: 'top',
      panelClass: ['custom-toast', `toast-${type}`], // ✅ Base + type class
      politeness: 'polite',
    };

    this.snackBar.open(message, action, { ...defaultConfig, ...config });
  }

  success(message: string, action?: string): void {
    this.showToast(message, 'success', action || '');
  }

  error(message: string, action?: string): void {
    this.showToast(message, 'error', action || 'Dismiss');
  }

  warning(message: string, action?: string): void {
    this.showToast(message, 'warning', action || '');
  }
}