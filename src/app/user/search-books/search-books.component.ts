// component where user can find all the books provided by library along with their availabilty, title, genre, etc details
import { Component, OnInit } from '@angular/core';

import { BookService } from './../../shared/book/book.service';
import { Book } from './../../shared/book.model';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss']
})
export class SearchBooksComponent implements OnInit {
  bookList: Array<Book>;
  selected: string;
  selectedCategory: string;
  needFilter: boolean;
  isTitleSelected: boolean;
  isAuthorSelected: boolean;
  isCategorySelected: boolean;
  title: string;
  author: string;
  // list of book genres available in library
  categories: Array<string> = ['Fiction', 'Non Fiction', 'Adventure', 'Horror', 'Mystery', 'Action', 'Motivational'];

  constructor(private bookService: BookService) {
    this.bookList = this.bookService.getBookList();
    this.needFilter = false;
  }

  // based on selected filter requirement, provide space for further filter details
  onFilterSelected() {
    // if no filter is selected, show all books
    if (this.selected === 'none') {
      this.needFilter = false;
      this.bookList = this.bookService.getBookList();
    } else if (this.selected === 'title') {
      this.needFilter = true;
      this.isTitleSelected = true;
      this.isAuthorSelected = false;
      this.isCategorySelected = false;
    } else if (this.selected === 'author') {
      this.needFilter = true;
      this.isTitleSelected = false;
      this.isAuthorSelected = true;
      this.isCategorySelected = false;
    } else {
      this.needFilter = true;
      this.isTitleSelected = false;
      this.isAuthorSelected = false;
      this.isCategorySelected = true;
    }
  }

  // perform filter based on the filter criteria selected
  filterSelection() {
    // display the list of books, filtered by title
    if (this.selected === 'title') {
      const re = new RegExp(this.title, 'gi');
      this.bookList = [];
      for (const book of this.bookService.getBookList()) {
        if (book.title.match(re) !== null) {
          this.bookList.push(book);
        }
      }
      // display the list of books, filtered by author
    } else if (this.selected === 'author') {
      const re = new RegExp(this.author, 'gi');
      this.bookList = [];
      for (const book of this.bookService.getBookList()) {
        if (book.author.match(re) !== null) {
          this.bookList.push(book);
        }
      }
      // display the list of books, filtered by category/genre
    } else {
      this.bookList = [];
      for (const book of this.bookService.getBookList()) {
        if (book.genre.toLowerCase() === this.selectedCategory.toLowerCase()) {
          this.bookList.push(book);
        }
      }
    }
  }

  ngOnInit() {
  }

}
