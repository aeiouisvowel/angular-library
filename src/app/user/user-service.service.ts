// service to provide various user related services like adding friend, removing friend, adding favourite category etc
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../shared/user.model';
import { AuthService } from './../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: Array<User>;

  constructor(private httpClient: HttpClient,
    private authService: AuthService) {
    this.httpClient.get('./assets/library-user-list.json').subscribe((data: Array<User>) => {
      this.userList = data;
    });
  }

  getBooksInHand(): Array<{ bookId: string, renewed: number }> {
    return this.authService.currUser.booksInHand;
  }

  recommendBook(bookId: string, friendEmail: string) {
    for (const user of this.userList) {
      if (user.email === friendEmail) {
        user.recommends.push(bookId);
      }
    }
  }

  deleteFriend(email: string) {
    for (let i = 0; i <= (this.authService.currUser.friends.length - 1); i++) {
      if (this.authService.currUser.friends[i] === email) {
        this.authService.currUser.friends.splice(i, 1);
      }
    }
  }

  deleteFavCategories(category: string) {
    for (let i = 0; i <= (this.authService.currUser.favCategories.length - 1); i++) {
      if (this.authService.currUser.favCategories[i] === category) {
        this.authService.currUser.favCategories.splice(i, 1);
      }
    }
  }

}
