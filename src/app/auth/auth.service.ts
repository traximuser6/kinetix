import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    this.authenticated$.next(!!token);
  }

  login(username: string, password: string): Observable<boolean> {
    // Fake authentication flow. Replace with real API call.
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('token', 'fake-jwt-token');
      this.authenticated$.next(true);
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authenticated$.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }
}
