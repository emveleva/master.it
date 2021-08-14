import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  user: User[] = [];
  userId!: string;
  authUrl = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  auth!: string;
  token!: string | null;
  constructor(private http: HttpClient, private router: Router) {}

  getUserData() {
    const token: any = localStorage.getItem('token');
    const userInfo = this.jwtHelper.decodeToken(token);
    return userInfo.sub;
  }

  public isAuthenticated(): boolean {
    this.token = localStorage.getItem('token');
    if (this.token !== null) {
      return !this.jwtHelper.isTokenExpired(this.token);
    } else {
      return false;
    }
  }
  register(email: string, password: string, courses: []):  Observable<AuthResponse>  {
    let user = { email, password, courses };
    return this.http.post<AuthResponse>(`${this.authUrl}register`, user, this.httpOptions);
  }
  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}login`, user);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
