import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [AuthService]
})
export class NavigationComponent implements OnInit {
  isAuth:boolean =  false;

  constructor(public authService: AuthService, 
    private router: Router) { 
    
  }

  ngOnInit() {
    
      
  }

  logoutClick() {
    this.authService.logout();
    this.router.navigate((['auth/logout']))
  }
}