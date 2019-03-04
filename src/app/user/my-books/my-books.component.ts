// show the list of books, currently with the user and also allow to perform various actions like add review, renew book, etc
import { Component, OnInit } from '@angular/core';

import { BookService } from './../../shared/book/book.service';
import { Book } from './../../shared/book.model';
import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
  bookList: Array<Book>;
  booksInHand: number;

  constructor(private bookService: BookService,
    private authService: AuthService
  ) {
    this.bookList = [];
    this.booksInHand = this.authService.currUser.booksInHand.length;
    if (this.booksInHand > 0) {
      for (const book of this.authService.currUser.booksInHand) {
        for (const bookDetail of this.bookService.getBookList()) {
          if (book.bookId === bookDetail.bookId.toString()) {
            this.bookList.push(bookDetail);
            break;
          }
        }
      }
    }
  }

  ngOnInit() {
  }

}
