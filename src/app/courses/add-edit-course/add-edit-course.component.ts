import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss'],
})
export class AddEditCourseComponent implements OnInit {
  allowCreateEdit!: boolean;
  courses!: Course[];
  course!: Course;
  courseName!: string;
  form!: FormGroup;
  locId!: string;
  error!: string;
  notification!: string;
  range!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditCourseComponent>,
    public courseService: CourseService
  ) {
    this.course = this.data.courseInfo;
  }

  private buildForm() {
    this.form = new FormGroup({
      id: new FormControl(this.course.id),
      name: new FormControl(this.course.name, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ]),
      imgUrl: new FormControl(
        this.course.imgUrl,
        Validators.pattern(
          /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/gm
        )
      ),
      description: new FormControl(this.course.description),
      lecturer: new FormControl(this.course.lecturer),
        startDate: new FormControl(this.course.startDate),
        endDate: new FormControl(this.course.endDate),
      difficultyLevel: new FormControl(this.course.difficultyLevel),
      category: new FormControl(this.course.category)
    });

  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.error = '';
    this.allowCreateEdit = true;
    this.notification = '';
    this.courseService.getCourses$().subscribe({
      next: (res) => {
        this.courses = res;
        this.courseName = this.form.get('name')?.value;
        this.locId = this.form.get('id')?.value;
        if (this.form.valid) {
          if (!this.form.get('id')?.value) {
            for (let i = 0; i < this.courses.length; i++) {
              if (this.courses[i].name == this.courseName) {
                this.error = 'Course with this name already exists.';
                this.allowCreateEdit = false;
                break;
              }
            }
            if (this.allowCreateEdit) {
              this.courseService.insertCourse(this.form.value).subscribe({
                next: () => {
                  this.notification = 'New course added!';

                  this.dialogRef.close({
                    result: this.allowCreateEdit,
                    message: this.notification,
                  });
                },
                error: (res: HttpErrorResponse) => {
                  this.error = res.error;
                },
              });
            }
          } else {
            if (!this.form.pristine) {
              this.courseService.updateCourse(this.form.value).subscribe({
                next: () => {
                  this.notification = 'Course edited!';
                  this.dialogRef.close({
                    result: this.allowCreateEdit,
                    message: this.notification,
                  });
                },
                error: (res: HttpErrorResponse) => {
                  this.error = res.error;
                },
              });
            } else {
              this.error = 'No changes were detected.';
            }
          }
        }
      },
    });
  }

  onClose() {
    this.dialogRef.close({ result: false });
  }
}
