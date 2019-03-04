import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { MyBooksComponent } from './my-books/my-books.component';

export const routes: Routes = [
  { path: '', component: UserHomeComponent, children: [
    { path: '', component: UserProfileComponent},
    { path: 'my-profile', component: UserProfileComponent},
    { path: 'my-books', component: MyBooksComponent},
    { path: 'search-books', component: SearchBooksComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
