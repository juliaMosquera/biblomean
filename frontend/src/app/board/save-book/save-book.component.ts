import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-book',
  templateUrl: './save-book.component.html',
  styleUrls: ['./save-book.component.css']
})
export class SaveBookComponent implements OnInit {
  bookData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;

  constructor( 
    private _bookService: BookService,
    private _router: Router,
    private _snackBar: MatSnackBar
    ) {
      this.bookData = {};
     }

     saveBook(){
      if (
        !this.bookData.title || 
        !this.bookData.author || 
        !this.bookData.category ||
        !this.bookData.editorial ||
        !this.bookData.bookStatus
  
        ) {
          this.message = 'Incomplete data'
          this.openSnackBarError();
      } else {
        this._bookService.saveBook(this.bookData).
         subscribe({
           next: (v) => {
            this._router.navigate(['/listBook']);
            this.message = 'Succesfull book registration';
            this.opeSnackBarSuccesfull();
           },
           error:(e) => {
            this.message = e.error.message;
            this.openSnackBarError();
           },
        });
      }
    }
  
    opeSnackBarSuccesfull(){
      this._snackBar.open(this.message, 'X', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds,
        panelClass:['styleSnackBarSuccesfull']
      })
    }
    openSnackBarError(){
      this._snackBar.open(this.message, 'X', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds,
        panelClass:['styleSnackBarError']
      })
    }
  
    ngOnInit(): void {}
  
  }