// home ui for admins, containing side nav and logout
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../core/auth/auth.service';
import { User } from './../../shared/user.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  currUser: User;

  constructor(private authService: AuthService,
    private router: Router
  ) {

    this.currUser = this.authService.currUser;

    // if the current admin is unauthenticated, navigate to home page
    if (!authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  // logout the admin and return to home page
  logout() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
