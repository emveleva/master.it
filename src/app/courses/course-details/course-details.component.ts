import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
id!: string | null;
course!: Course
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) {
    
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
}
