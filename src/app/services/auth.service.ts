import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  register(email: string, password: string, hiredDevs: []) {
    let user = { email, password, hiredDevs };
    return this.http.post(`${this.authUrl}register`, user, this.httpOptions);
  }
  login(email: string, password: string) {
    let user = { email, password };
    return this.http.post(`${this.authUrl}login`, user, this.httpOptions);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
