// home page of anytime library
import { Component, OnInit } from '@angular/core';

import { BookService } from './../../shared/book/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

}
