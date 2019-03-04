// This service is used for authentication user and get information about the logged in user
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './../../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currUser: User = null;
  token: String;
  provider = new firebase.auth.GoogleAuthProvider();

  constructor(private httpClient: HttpClient,
    private router: Router
  ) { }

  // use google OAuth to authenticate user to this application
  googleSignIn() {
    firebase.auth().signInWithPopup(this.provider).then((result) => {
      this.isExistingUser(result.user);
      firebase.auth().currentUser.getIdToken().then((idToken) => {
        this.token = idToken;
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  // perform signout
  signOut() {
    firebase.auth().signOut();
    this.token = null;
  }

  // get the logged in user's token
  getToken(): any {
    firebase.auth().currentUser.getIdToken().then((idToken) => {
      return idToken;
    }).catch((error) => {
      return null;
    });
  }

  // to check user's authentication
  isAuthenticated() {
    return this.token != null;
  }

  // if the user is new create a default profile with role as user. Currently it is checking in local json file.
  isExistingUser(userData: any) {
    // later can be replaced with a backend service
    this.httpClient.get('./assets/library-user-list.json').subscribe((data: Array<User>) => {
      for (const user of data) {
        if (user.email === userData.email) {
          this.currUser = user;
          if (this.currUser.role === 'admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user']);
          }
        }
      }
      if (this.currUser == null) {
        // add new user to library users
        // please change this role from "user" to "admin" to navigate to get admin related pages
        this.currUser = new User(userData.email, userData.displayName, 'user', userData.photoURL);

        // if role is modified to "admin", then below navigation should also be changed to admin
        this.router.navigate(['user']);
      }
    });
  }

  // checks if the logged in user is admin
  isAdmin() {
    if (this.currUser !== null) {
      return this.currUser.role === 'admin';
    } else {
      return false;
    }
  }
}
