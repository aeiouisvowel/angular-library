// home ui for users, containing side nav and logout
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../core/auth/auth.service';
import { User } from './../../shared/user.model';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  currUser: User;

  constructor(private authService: AuthService,
    private router: Router
  ) {

    this.currUser = this.authService.currUser;

    // if the current user is unauthenticated, navigate to home page
    if (!authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  // logout user and return to home page
  logout() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

}
