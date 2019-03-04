// module to encapsulates core elements of project like authentication, header, etc
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './../shared/shared.module';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SignInComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
