import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Course } from 'src/app/models/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-signed-up-list',
  templateUrl: './signed-up-list.component.html',
  styleUrls: ['./signed-up-list.component.scss']
})
export class SignedUpListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'start', 'end', 'lecturer', 'category', 'language', 'difficulty'];
  courses!: any;
  course!: Course[];
  userId!: string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource = new MatTableDataSource<CourseInfo>();
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {
    this.dataSource = new MatTableDataSource(this.courses);
  }

  loadCourses() {
    this.userId = this.authService.getUserData();
    this.dashboardService.getCourses$(this.userId).subscribe({
      next: (res) => {
        this.courses = res.courses;
          this.dataSource.data = this.courses;
      
        
      },
    });
  }
  ngOnInit(){
    this.loadCourses();
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
  }
}
export interface CourseInfo {
  name: string;
  start: string;
  end: string;
  lecturer: string,
  category: string, 
  language: string, 
  difficulty: string

}
