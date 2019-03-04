// admin module, that is loaded lazily, whenever an admin sign in
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AddBookComponent } from './add-book/add-book.component';
import { LibraryComponent } from './library/library.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminProfileComponent,
    AddBookComponent,
    LibraryComponent,
    EditBookComponent
  ]
})
export class AdminModule { }
