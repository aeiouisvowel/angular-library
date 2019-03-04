import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { LibraryComponent } from './library/library.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  { path: '', component: AdminHomeComponent, children: [
    { path: '', component: AdminProfileComponent},
    { path: 'my-profile', component: AdminProfileComponent},
    { path: 'all-books', component: LibraryComponent},
    { path: 'add-book', component: AddBookComponent},
    { path: 'edit-book/:book-id', component: EditBookComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
