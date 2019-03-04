// display all the books, provided by library. An admin can edit and delete book from here. Also admin can filter books, borrowed by users
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { Book } from './../../shared/book.model';
import { BookService } from './../../shared/book/book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  displayedColumns: string[] = ['action', 'bookId', 'title', 'author', 'issuedTo', 'issuedDate'];
  dataSource = new MatTableDataSource<{
    bookId: string,
    title: string,
    author: string,
    issuedTo: string,
    issuedDate: string
  }>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private bookService: BookService
  ) {
  }

  ngOnInit() {
    this.dataSource.data = this.bookService.getLimitedBookListData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // display list of books according to the matching string
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // delete a book from library
  deleteBook(bookId: string) {
    this.bookService.deleteBook(bookId);
    this.dataSource.data = this.bookService.getLimitedBookListData();
  }

  // if checked, display only the list of books, currently with users
  displayBorrowedBookChange($event) {
    if ($event.checked === false) {
      this.dataSource.data = this.bookService.getLimitedBookListData();
    } else {
      this.dataSource.data = this.bookService.getLimitedBorrowedBookListData();
    }
  }

}
