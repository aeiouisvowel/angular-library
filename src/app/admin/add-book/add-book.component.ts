// component to add a new book to library. Reactive Forms is used.
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { Book } from './../../shared/book.model';
import { BookService } from './../../shared/book/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})

export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;
  searchIsbn: string;
  bookId: string;
  book: Book;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private bookService: BookService,
    public snackBar: MatSnackBar
  ) {
    this.searchIsbn = '';
    this.book = new Book();
  }

  // add the book if all the required information is provide
  onSubmit() {
    console.log(this.addBookForm);
    this.bookService.addBook(this.book);
    const snackBarRef = this.snackBar.open('Book Added', '', {
      duration: 1500,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/admin/all-books']);
    });
  }

  // if isbn is given, search with google api and loads its data into form
  searchByISBN() {
    this.httpClient.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + this.searchIsbn)
      .subscribe((data: SearchResult) => {
        if (data.totalItems > 0) {
          this.book.title = data.items[0].volumeInfo.title;
          this.book.author = data.items[0].volumeInfo.authors[0];
          for (const isbnType of data.items[0].volumeInfo.industryIdentifiers) {
            if (isbnType.type === 'ISBN_10') {
              this.book.isbn10 = isbnType.identifier;
            } else {
              this.book.isbn13 = isbnType.identifier;
            }
          }
          if (data.items[0].volumeInfo.imageLinks) {
            this.book.thumbnail = data.items[0].volumeInfo.imageLinks.thumbnail;
          }
          if (data.items[0].volumeInfo.ratingsCount) {
            this.book.avgRating.givenBy = data.items[0].volumeInfo.ratingsCount;
          }
          if (data.items[0].volumeInfo.averageRating) {
            this.book.avgRating.rating = data.items[0].volumeInfo.averageRating;
          }
          this.book.description = data.items[0].volumeInfo.description;
          this.addBookForm.get('title').disable();
          this.addBookForm.get('author').disable();
          this.addBookForm.get('isbn10').disable();
          this.addBookForm.get('isbn13').disable();
          this.addBookForm.get('rating').disable();
          this.addBookForm.get('givenBy').disable();
        } else {
          this.addBookForm.get('title').enable();
          this.addBookForm.get('author').enable();
          this.addBookForm.get('isbn10').enable();
          this.addBookForm.get('isbn13').enable();
          this.addBookForm.get('rating').enable();
          this.addBookForm.get('givenBy').enable();
          this.book = new Book();
        }
      });
  }

  ngOnInit() {
    this.addBookForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'author': new FormControl(null, Validators.required),
      'isbn10': new FormControl(null, Validators.required),
      'isbn13': new FormControl(null, Validators.required),
      'genre': new FormControl(null, Validators.required),
      'thumbnail': new FormControl(null),
      'location': new FormControl(null, Validators.required),
      'rating': new FormControl(null, Validators.required),
      'givenBy': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
  }

}

// interface to get the data from google api in particular format
export interface SearchResult {
  'kind': string;
  'totalItems': number;
  'items': Array<{
    'volumeInfo': {
      'title': string,
      'authors': Array<string>,
      'description': string,
      'industryIdentifiers': Array<{
        'type': string,
        'identifier': string
      }>,
      'averageRating': number,
      'ratingsCount': number,
      'imageLinks': {
        'smallThumbnail': string,
        'thumbnail': string
      }
    }
  }>;
}
