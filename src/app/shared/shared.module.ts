// shared module to import and export common elements among all modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './../shared/material/material.module';
import { BookComponent } from './book/book.component';

@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    BookComponent,
    FormsModule
  ]
})
export class SharedModule { }
