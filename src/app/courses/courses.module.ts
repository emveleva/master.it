import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    AddEditCourseComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CoursesRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class CoursesModule { }
