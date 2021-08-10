import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { User } from '../../models/user.model'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  hide = true;
  auth!: string;
  token!: string | null;
  error!: string;
  constructor(private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationService) { }
  registerUser(user: User){
    if (user.password !== user.rePassword){
      this.notificationsService.error("The passwords you entered don't match.")
    } else if (user.password.length < 6){
      this.notificationsService.error("Your password should contain at least 6 characters.")
    }else {
    const { email, password } = user;
    const courses: [] = [];
    this.authService.register(email, password, courses).subscribe({
      next: (res: any) => {
        this.auth = res['accessToken'];
        localStorage.setItem('token', this.auth);
        this.token = res['accessToken']
        this.router.navigate(['/'])
      },
      error: (res: HttpErrorResponse) => {
        this.notificationsService.error(res.error)
      }
    });
  }
}
  ngOnInit(): void {
  }

}
