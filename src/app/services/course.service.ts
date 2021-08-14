import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Course } from '../models/course.model';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
      httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          };
      constructor(private http: HttpClient) {}

  getCourses$(): Observable<Course[]> {
      return this.http.get<Course[]>(`${environment.apiUrl}courses`);
    }
    insertCourse(course: Course) {
      return this.http.post(`${environment.apiUrl}courses`, course, this.httpOptions)
    }
    updateCourse(course: Course) {
      return this.http.put(`${environment.apiUrl}courses/${course.id}`, course, this.httpOptions);
    }
  
    deleteCourse(id: string): Observable<Course[]> {
      return this.http.delete<Course[]>(`${environment.apiUrl}courses/${id}`);
    }

    getOneCourse(id: string){
          return this.http.get(`${environment.apiUrl}courses/${id}`)
    }

    getSignedUsers(id: string){
      return this.http.get(`${environment.apiUrl}courses/${id}`)
    }
    updateSignedUsers(id: string, signedUsers: []){
      return this.http.patch(`${environment.apiUrl}courses/${id}`, {signedUsers: signedUsers}, this.httpOptions)
    }
}