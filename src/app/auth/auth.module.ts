import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';


// const appRoutes: Routes = [
//   // { path: 'register', component: RegisterComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'logout', component: LogoutComponent}

// ];


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    // RouterModule.forRoot(
    //   appRoutes
    // )

  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
