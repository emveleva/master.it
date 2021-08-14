import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notifications.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
id!: string | null;
course!: Course
allowDelete: boolean = true;
allowSignUp: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService,
    private dialogRef: MatDialog,
    private notificationsService: NotificationService,
    private dashboardService: DashboardService, private authService: AuthService, private router: Router) {
    
   }

  ngOnInit() {
   this.getCourseInfo();

  }

  getCourseInfo(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id){
    this.courseService.getOneCourse(this.id).subscribe({
      next: (res: any) => {
        this.course = res
      }
    })
  }
  }
  
  signUp(courseName: string, id: string){
    const userId = this.authService.getUserData();
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      width: '30%',
      data: {
        title: 'Are you sure you want to sign up for this course?',
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.dashboardService.getCourses(userId).subscribe({
          next: (res: any) => {
            const courses = res.courses;
            courses.forEach((currentCourse: { name: string; }) => {
              if (currentCourse.name == courseName){
                this.allowSignUp = false;
              }
            });
            if (!this.allowSignUp){
              this.notificationsService.error('You are already signed up!')
            } else {
              courses.push(this.course)
              this.dashboardService.updateCourses(userId, courses).subscribe({
                next: () => {
                  this.notificationsService.success('Signed up!');
                  this.router.navigate(['courses'])
                },
                error: (res: HttpErrorResponse) => {
                  this.notificationsService.error(res.error);
                },
              });
              this.courseService.getSignedUsers(id)
              .subscribe({
                next: (res: any) => {
                  const signedUsers = res.signedUsers;
                  signedUsers.push(userId)
                  this.courseService.updateSignedUsers(id, signedUsers).subscribe({
                    next: () => {
                      this.notificationsService.success('Signed up!');
                    },
                    error: (res: HttpErrorResponse) => {
                      this.notificationsService.error(res.error);
                    },
                  });
            }
          }
        );
            }
          },
        });
      

    }
  })
}

  
  
  onEdit(courseInfo: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { courseInfo };
    const ref = this.dialogRef.open(AddEditCourseComponent, dialogConfig);
    ref.afterClosed().subscribe({
      next: (res: any) => {
        if (res.result) {
          this.getCourseInfo();
          this.notificationsService.success(res.message);
        }
      },
    });
  }
  onDelete(id: string) {
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      width: '30%',
      data: {
        title: 'Are you sure you want to delete this course?',
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.courseService.getOneCourse(id).subscribe({
          next: (res: any) => {
            if (res.signedUsers.length > 0) {
                  this.allowDelete = false;
                  this.notificationsService.error(
                    'The course cannot be deleted.'
                  );
                }            
            if (this.allowDelete) {
              this.courseService.deleteCourse(id).subscribe({
                next: () => {
                  this.notificationsService.success('Course deleted.');
                  this.router.navigate(['courses'])
                },
              });
            }
          },
        });
      }
    });
  }
}
