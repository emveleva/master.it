import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notifications.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
id!: string | null;
course!: Course
allowDelete: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService,
    private dialogRef: MatDialog,
    private notificationsService: NotificationService) {
    
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id){
      this.getCourseInfo(this.id)
    }

  }
  getCourseInfo(id: string){
    this.courseService.getOneCourse(id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.course = res
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
          this.notificationsService.success(res.message);
        }
      },
    });
  }
  onDelete(id: string) {
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      width: '30%',
      data: {
        title: 'Are you sure you want to delete this developer?',
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.courseService.getOneCourse(id).subscribe({
          next: (res: any) => {
            if (res.hiredDates.length > 0) {
              for (let i = 0; i < res.hiredDates.length; i++) {
                if (
                  JSON.stringify(res.hiredDates[i].end) >
                  JSON.stringify(new Date())
                ) {
                  this.allowDelete = false;
                  this.notificationsService.error(
                    'The developer is currently hired and cannot be deleted.'
                  );
                  break;
                }
              }
            }
            if (this.allowDelete) {
              this.courseService.deleteCourse(id).subscribe({
                next: () => {
                  this.notificationsService.success('Developer deleted.');
                },
              });
            }
          },
        });
      }
    });
  }
}
