import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notifications.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  auth!: string;
  form!: FormGroup;
  user!: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {
    this.buildForm();
  }
  onSubmit() {
    this.authService.login(this.form.value).pipe(take(1)).subscribe({
      next: (res) => {
        this.auth = res['accessToken'];
        localStorage.setItem('token', this.auth);
        this.router.navigate(['courses']);
      },
      error: (res: HttpErrorResponse) => {
        if (res.error == 'Incorrect password' || 'Cannot find user') {
          this.notificationService.error('Incorrect username or password.');
        } else {
          this.notificationService.error(res.error);
        }
      },
    });
  }
}
