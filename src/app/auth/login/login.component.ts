import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model'
import {
  HttpErrorResponse,
} from '@angular/common/http';
import { NotificationService } from 'src/app/services/notifications.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  hide = true;
  auth!: string;
  token!: string | null;
  userId!: string;
  
  constructor(private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationService
    ) { }

  ngOnInit(): void {
  }
  loginUser(user: User){

    const { email, password } = user;
    this.authService.login(email, password).subscribe({
        next: (res: any) => {
          this.auth = res['accessToken'];
          localStorage.setItem('token', this.auth);
          this.token = res['accessToken']
          this.userId = res.sub;
          this.router.navigate(['/'])
        },
        error: (res: HttpErrorResponse) => {
          if (res.error == "Incorrect password" || "Cannot find user"){
            this.notificationsService.error('Incorrect email or password.')
          } else {
            this.notificationsService.error(res.error)
          }
          
        }
      });
  }
}
