import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.errorMessage = '';
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.auth.login(username, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
}
