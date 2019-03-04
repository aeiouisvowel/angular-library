// component to edit an existing book. Tempplate Driven Form is used
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Book } from './../../shared/book.model';
import { BookService } from './../../shared/book/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  bookId: string;
  book: Book;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    public snackBar: MatSnackBar
  ) {
    this.bookId = this.route.snapshot.params['book-id'];
    this.book = this.bookService.getBook(this.bookId);
  }

  onSubmit(form: NgForm) {
    this.bookService.updateBook(this.bookId, this.book);
    const snackBarRef = this.snackBar.open('Book updated', '', {
      duration: 1500,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['/admin/all-books']);
    });
  }

  ngOnInit() {
  }

}
