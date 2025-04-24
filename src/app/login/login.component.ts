import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Add these imports
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,
    HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginMode = false;
  private readonly baseUrl: string = environment.apiUrl;

  credentials = {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    position: ''
  };

  constructor(private router: Router, private http: HttpClient
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    // Reset form when toggling
    this.credentials = {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      position: ''
    };
  }

  onSubmit() {
    if (this.isLoginMode) {
      // Login request
      this.http.post(`${this.baseUrl}/auth/login`, {
        username: this.credentials.email,
        password: this.credentials.password
      })
        .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Login failed. Please try again.');
        }
      });
    } else {
      // Registration request
      if (this.credentials.password !== this.credentials.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      this.http.post(`${this.baseUrl}/auth/signup`, {
        role: 'HR',
        hrDetails: {
          email: this.credentials.email,
          password: this.credentials.password,
          name: this.credentials.name,
          position: this.credentials.position,
        }
      }).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          alert('Registration failed. Please try again.');
        }
      });

      // After successful registration, you might want to:
      // 1. Automatically log the user in
      // 2. Show a success message
      // 3. Redirect to login or dashboard
      this.router.navigate(['/home']);
    }
  }
}
