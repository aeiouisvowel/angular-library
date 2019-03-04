// component to display the information regarding book like its title, availability, etc to user for each book
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { UserService } from './../../user/user-service.service';
import { AuthService } from './../../core/auth/auth.service';
import { BookService } from './book.service';
import { Book } from './../book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() bookDetails: Book;

  isUser: boolean;
  isWithUser: boolean;
  availableToIssue: boolean;
  canRenew: boolean;
  bookId: string;

  selectedRate: string;
  comment: string;

  friendsEmail: string;

  userBookList: Array<{bookId: string, renewed: number}>;

  constructor(private userService: UserService,
    private authService: AuthService,
    private bookService: BookService,
    public snackBar: MatSnackBar
  ) {
    this.isUser = !authService.isAdmin();
    this.userBookList = userService.getBooksInHand();
   }

  ngOnInit() {
    this.isWithUser = false;
    this.canRenew = true;
    for (const book of this.userBookList) {
      if (book.bookId === this.bookDetails.bookId.toString()) {
        this.isWithUser = true;
        if (book.renewed !== 0) {
          this.canRenew = false;
        }
      }
    }
    if (this.isWithUser === false && this.bookDetails.availability.availableBy === 'Available') {
      this.availableToIssue = true;
    }
  }

  // get te review and use book service to store user's review and rating
  submitReview() {
    this.bookService.addReview(this.bookDetails.bookId, parseInt(this.selectedRate, 10), this.comment);
  }

  // to issue book
  submitIssue() {
    const issueBook = this.bookService.issueBook(this.bookDetails.bookId);
    if (issueBook === true) {
      this.isWithUser = true;
      this.canRenew = true;
    }
  }

  // to renew book. only one time is allowed
  submitRenew() {
    this.bookService.renewBook(this.bookDetails.bookId);
    this.canRenew = false;
  }

  // to return book back to library
  submitReturn() {
    this.bookService.returnBook(this.bookDetails.bookId);
    this.isWithUser = false;
    this.canRenew = true;
  }

  // recommend book to friend
  submitRecommend() {
    this.userService.recommendBook(this.bookDetails.bookId, this.friendsEmail);
    this.snackBar.open('Book Recommended', '', {
      duration: 1500,
    });
  }

}
