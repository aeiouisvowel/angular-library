// component to store user information, profile picture, etc
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { AuthService } from './../../core/auth/auth.service';
import { User } from './../../shared/user.model';
import { UserService } from './../user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currUser: User;
  noOfBooksInHand: number;
  ifNoRecommends: boolean;
  ifNoFriends: boolean;
  ifNoFavCategory: boolean;
  editFriends: boolean;
  editFavCategories: boolean;
  newCategory: string;
  newFriend: string;

  constructor(private authService: AuthService,
    private userService: UserService,
    public snackBar: MatSnackBar
  ) {
    this.editFavCategories = false;
    this.editFriends = false;
    this.newCategory = '';
    this.newFriend = '';
    this.currUser = this.authService.currUser;
    this.noOfBooksInHand = this.authService.currUser.booksInHand.length;
    if (this.authService.currUser.recommends.length > 0) {
      this.ifNoRecommends = false;
    } else {
      this.ifNoRecommends = true;
    }
    if (this.authService.currUser.favCategories.length > 0) {
      this.ifNoFavCategory = false;
    } else {
      this.ifNoFavCategory = true;
    }
    if (this.authService.currUser.friends.length > 0) {
      this.ifNoFriends = false;
    } else {
      this.ifNoFriends = true;
    }
   }

  ngOnInit() {
  }

  // to edit friend list
  enableEditFriends() {
    this.editFriends = true;
  }

  // when done editing friend list
  disableEditFriends() {
    this.editFriends = false;
  }

  // to remove a friend
  deleteFriend(email: string) {
    this.userService.deleteFriend(email);
    if (this.authService.currUser.friends.length === 0) {
      this.ifNoFriends = true;
    }
    this.snackBar.open('Deleted', '', {
      duration: 1500,
    });
  }

  // add a new friend
  addFriend() {
    this.authService.currUser.friends.push(this.newFriend);
    this.newFriend = '';
    this.ifNoFriends = false;
    this.snackBar.open('Friend added', '', {
      duration: 1500,
    });
  }

  // add a new favourite category
  addFavCategory() {
    this.authService.currUser.favCategories.push(this.newCategory);
    this.newCategory = '';
    this.ifNoFavCategory = false;
    this.snackBar.open('Category added', '', {
      duration: 1500,
    });
  }

  // to edit existing favourite category. This can be used with machine learning to suggest books
  enableEditFavCategories() {
    this.editFavCategories = true;
  }

  // when done modifying favourite category
  disableEditFavCategories() {
    this.editFavCategories = false;
  }

  // to delete a favourite category
  deleteFavCategories(category: string) {
    this.userService.deleteFavCategories(category);
    if (this.authService.currUser.favCategories.length === 0) {
      this.ifNoFavCategory = true;
    }
    this.snackBar.open('Category Deleted', '', {
      duration: 1500,
    });
  }
}
