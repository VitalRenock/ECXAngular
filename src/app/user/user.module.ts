import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { GetAllComponent } from './components/get-all/get-all.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    GetAllComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,

    // Import du module Shared
    SharedModule
  ]
})
export class UserModule { }
