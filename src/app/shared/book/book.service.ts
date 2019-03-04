// service for maintaing all the services related to maintaining books in library like adding, assigning, deleting etc
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { Book } from './../book.model';
import { AuthService } from './../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookId: number;
  bookList: Array<Book>;
  limitedBookListData: Array<{
    bookId: string,
    title: string,
    author: string,
    issuedTo: string,
    issuedDate: string
  }>;
  maxBook = 5;

  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {
    // to be used whenever a new book is added, as its bookId. It is incremented after every addition of book
    this.bookId = 40;
    // get this list of books, currently provided by library. Loaded from local json file.
    this.httpClient.get('./assets/library-book-list.json').subscribe((data: Array<Book>) => {
      this.bookList = data;
    });
  }

  // returns the list of books provided by library
  getBookList() {
    return this.bookList;
  }

  // returns limited list of information of books, to be used by admin for further action
  getLimitedBookListData() {
    this.limitedBookListData = [];
    for (const book of this.bookList) {
      this.limitedBookListData.push({
        bookId: book.bookId,
        title: book.title,
        author: book.author,
        issuedTo: book.availability.issuedTo,
        issuedDate: book.availability.issuedDate
      });
    }
    return this.limitedBookListData;
  }

  // returns limited list of information for books which are currently with users
  getLimitedBorrowedBookListData() {
    this.limitedBookListData = [];
    for (const book of this.bookList) {
      if (book.availability.issuedTo !== '') {
        this.limitedBookListData.push({
          bookId: book.bookId,
          title: book.title,
          author: book.author,
          issuedTo: book.availability.issuedTo,
          issuedDate: book.availability.issuedDate
        });
      }
    }
    return this.limitedBookListData;
  }

  // add reviews given by the user
  addReview(bookId: string, rate: number, comment: string) {
    for (const book of this.bookList) {
      if (book.bookId === bookId) {
        book.reviews.push({
          'reviewBy': this.authService.currUser.name,
          'rating': rate,
          'comment': comment
        });
        book.avgRating.rating = (((book.avgRating.rating * book.avgRating.givenBy) + rate) / (book.avgRating.givenBy + 1));
        book.avgRating.givenBy += 1;
      }
    }
    this.snackBar.open('Rating and Review saved', '', {
      duration: 1500,
    });
  }

  // issues the book to the user
  issueBook(bookId): boolean {
    if (this.authService.currUser.booksInHand.length < this.maxBook) {
      for (const book of this.bookList) {
        if (book.bookId === bookId) {
          book.availability.issuedTo = this.authService.currUser.email;
          const date = new Date();
          book.availability.issuedDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
          date.setDate(date.getDate() + 14);
          book.availability.availableBy = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
          this.authService.currUser.booksInHand.push({ 'bookId': book.bookId.toString(), 'renewed': 0 });
          this.snackBar.open('Book Issued. Please collect from location: ' + book.location, '', {
            duration: 1500,
          });
          return true;
        }
      }
    } else {
      this.snackBar.open('Could not issue the book. You have already issued maximum number of books', '', {
        duration: 1500,
      });
      return false;
    }
  }

  // renew the book for user if it is not already renewed once. Max one time renewing of book is allowed
  renewBook(bookId) {
    for (const book of this.bookList) {
      if (book.bookId === bookId) {
        const availableByDateArray: Array<string> = book.availability.availableBy.split('/');
        const currAvailableMonth = parseInt(availableByDateArray[0], 10);
        const currAvailableDate = parseInt(availableByDateArray[1], 10);
        const currAvailableYear = parseInt(availableByDateArray[2], 10);
        const currEndDate = new Date(currAvailableYear, (currAvailableMonth - 1), currAvailableDate);
        currEndDate.setDate(currEndDate.getDate() + 14);
        book.availability.availableBy = ((currEndDate.getMonth() + 1) + '/' + currEndDate.getDate() + '/' + currEndDate.getFullYear());
        for (const userBook of this.authService.currUser.booksInHand) {
          if (userBook.bookId === bookId.toString()) {
            userBook.renewed = 1;
            this.snackBar.open('Book Renewed', '', {
              duration: 1500,
            });
          }
        }
      }
    }
  }

  // return the book in library
  returnBook(bookId) {
    for (const book of this.bookList) {
      if (book.bookId === bookId) {
        book.availability.issuedTo = '';
        book.availability.availableBy = 'Available';
        book.availability.issuedDate = '';
      }
    }
    for (let i = 0; i <= (this.authService.currUser.booksInHand.length - 1); i++) {
      if (this.authService.currUser.booksInHand[i].bookId === bookId.toString()) {
        this.authService.currUser.booksInHand.splice(i, 1);
      }
    }
    this.snackBar.open('Book Returned', '', {
      duration: 1500,
    });
  }

  // removes the book from library
  deleteBook(bookId: string) {
    for (let i = 0; i <= (this.bookList.length - 1); i++) {
      if ((this.bookList[i].bookId).toString() === bookId.toString()) {
        this.bookList.splice(i, 1);
        this.snackBar.open('Book Deleted: ' + bookId, '', {
          duration: 1500,
        });
      }
    }
  }

  // get the book by its id
  getBook(bookId: string) {
    for (let i = 0; i <= (this.bookList.length - 1); i++) {
      if ((this.bookList[i].bookId).toString() === bookId.toString()) {
        return this.bookList[i];
      }
    }
    return null;
  }

  // update the book
  updateBook(bookId: string, bookDetails: Book) {
    for (let i = 0; i <= (this.bookList.length - 1); i++) {
      if ((this.bookList[i].bookId).toString() === bookId.toString()) {
        this.bookList[i] = bookDetails;
      }
    }
  }

  // add new book
  addBook(bookDetails: Book) {
    bookDetails.bookId = (this.bookId).toString();
    this.bookId += 1;
    this.bookList.push(bookDetails);
  }

}
