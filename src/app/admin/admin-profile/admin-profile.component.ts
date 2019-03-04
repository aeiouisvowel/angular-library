// component to display information of admin like profile pic, role etc
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../core/auth/auth.service';
import { User } from './../../shared/user.model';
import { UserService } from './../../user/user-service.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  currUser: User;

  constructor(private authService: AuthService,
    private userService: UserService
  ) {
    this.currUser = this.authService.currUser;
  }

  ngOnInit() {
  }

}
