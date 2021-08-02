import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
      baseUrl = 'http://localhost:3000/courses';
      constructor(private http: HttpClient) {}

  getCourses$(): Observable<Course[]> {
      return this.http.get<Course[]>(`${this.baseUrl}`);
    }
    insertCourse(course: any) {
      return this.http.post(`${this.baseUrl}`, course, this.httpOptions)
    }
    updateCourse(course: any) {
      return this.http.put(`${this.baseUrl}/${course.id}`, course, this.httpOptions);
    }
  
    deleteCourse(id: string) {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getOneCourse(id: string){
          return this.http.get(`${this.baseUrl}/${id}`)
    }
}