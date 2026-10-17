// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/auth';

export interface LoggedInUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  access_token: string;
  token_type: string;
  user: LoggedInUser;
}
export interface RegisterResponse {
  success: boolean;
  message: string;
  user_id: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<LoggedInUser | null>(
    this.getSavedUser()
  );

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post<LoginResponse>(
      `${API_URL}/login`,
      data
    ).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('current_user', JSON.stringify(response.user));
        this.userSubject.next(response.user);
      })
    );
  }

  register(data: any) {
    return this.http.post<RegisterResponse>(
      `${API_URL}/register`,
      data
    );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getCurrentUser(): LoggedInUser | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    this.userSubject.next(null);
  }

  private getSavedUser(): LoggedInUser | null {
    try {
      const user = localStorage.getItem('current_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
}
