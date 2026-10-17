
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading = false;
  errorMessage = '';
  successMessage = '';

  formData = {
    full_name: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    age: null as number | null,
    state: '',
    city: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';

    if (
      !this.formData.full_name.trim() ||
      !this.formData.email.trim() ||
      !this.formData.phone.trim() ||
      !this.formData.password ||
      !this.formData.gender ||
      this.formData.age === null ||
      !this.formData.state.trim() ||
      !this.formData.city.trim()
    ) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;

    const payload = {
      ...this.formData,
      full_name: this.formData.full_name.trim(),
      email: this.formData.email.trim(),
      phone: this.formData.phone.trim(),
      state: this.formData.state.trim(),
      city: this.formData.city.trim()
    };

    this.authService.register(payload).subscribe({
      next: (response) => {
        this.loading = false;
    
        this.successMessage =
          response.message || 'Registration successful!';
    
        console.log('Registration successful:', response);
    
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
    
      error: (error) => {
        this.loading = false;
    
        console.error('Registration failed:', error);
    
        this.errorMessage = Array.isArray(error.error?.detail)
          ? error.error.detail
              .map((e: any) => `${e.loc?.join('.')} — ${e.msg}`)
              .join(', ')
          : error.error?.detail || 'Registration failed.';
      }
    });
  }
}
