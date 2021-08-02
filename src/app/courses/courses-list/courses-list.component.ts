import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses!: Course[];
  allowDelete: boolean = true;
  constructor(
    private dialogRef: MatDialog,
    private courseService: CourseService,
    private notificationsService: NotificationService,
    private router: Router
  ) {}

  loadCourses() {
    this.courseService.getCourses$().subscribe({
      next: (res) => {
        this.courses = res;
      },
    });
  }
  ngOnInit() {
    this.loadCourses();
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = { courseInfo: new Course() };
    const ref = this.dialogRef.open(AddEditCourseComponent, dialogConfig);
    ref.afterClosed().subscribe({
      next: (res) => {
        if (res.result) {
          this.loadCourses();
          this.notificationsService.success(res.message)
        }
      },
    });
  }


  openDetails(course: Course){
    this.router.navigate([`courses/${course.id}`])
    console.log('here')
  }
}
