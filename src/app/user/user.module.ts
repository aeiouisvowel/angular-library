// user module, that is loaded lazily when a user sign in
import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { SharedModule } from './../shared/shared.module';
import { UserService } from './user-service.service';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    UserHomeComponent,
    UserProfileComponent,
    MyBooksComponent,
    SearchBooksComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
