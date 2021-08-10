import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
      httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          };
      constructor(private http: HttpClient) {}
      getCourses$(id: string): Observable<User> {
            return this.http.get<User>(`${environment.apiUrl}users/${id}`)
          }

    getCourses(id: string){
      return this.http.get(`${environment.apiUrl}users/${id}`)
    }
    updateCourses(id: string, courses: []){
      return this.http.patch(`${environment.apiUrl}users/${id}`, {courses: courses}, this.httpOptions)
    }
}