import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    console.log('Sign In button clicked');
  
    this.errorMessage = '';
  
    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }
  
    this.loading = true;
  
    this.authService.login({
      email: this.email.trim(),
      password: this.password
    }).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Login response:', response);
        this.router.navigate(['/screening']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error:', error);
  
        this.errorMessage =
          error.error?.detail ||
          error.error?.message ||
          'Login failed. Please check your credentials.';
      }
    });
  }
}