import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:8000/api/auth';

  
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.authState.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }
  constructor(private http: HttpClient) {}

  register(data: {
    email: string;
    password: string
    learning_profile: string;
    password_confirm: string;
  }) {
    return this.http.post<any>(`${this.API}/register`, data)
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.access_token);
        })
      );
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.API}/login`, data)
      .pipe(
        tap(res => {
          this.saveSession(res.access_token);
        })
      );
  }

  private saveSession(token: string): void {
  localStorage.setItem('access_token', token);
  this.authState.next(true);
}

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.authState.next(false);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

   isAuthenticated(): boolean {
    return this.hasToken();
  }

  

}
