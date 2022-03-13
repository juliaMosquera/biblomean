import { Component, OnInit } from '@angular/core';
import { BookService } from "../../services/book.service";
import { 
  MatSnackBar, 
  MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition 
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  bookData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
 verticalPosition: MatSnackBarVerticalPosition = 'top';
 durationInSeconds: number = 2000;
 
   constructor(
     private _bookService: BookService, 
     private _snackBar: MatSnackBar
     ) {
     this.bookData = {};
    }
 
   ngOnInit(): void {
     this._bookService.listBook().subscribe({
       next:(v) => {
         this.bookData = v.books;
       },
       error:(e) => {
         this.message = e.error.message;
           this.openSnackBarError();
       },
     });
   }
 
   updateBook(book: any, status: string){
    let tempStatus = book.bookStatus
    book.bookStatus = status
    this._bookService.updateBook(book).subscribe({
      next: (v) => {},
      error: (e) => {
        book.taskStatus = tempStatus
        this.message = e.error.message
        this.openSnackBarError();
      },
    })
   }
   deleteBook(book: any){
    this._bookService.deleteBook(book).subscribe({
      next: (v) => {
        let index = this.bookData.indexOf(book)
        if(index >= 0){
          this.bookData.splice(index,1)
          this.message = v.message;
          this.opeSnackBarSuccesfull();
        }
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarError();
      },
    });
   }
 
   opeSnackBarSuccesfull(){
     this._snackBar.open(this.message, 'X', {
       horizontalPosition: this.horizontalPosition,
       verticalPosition: this.verticalPosition,
       duration: this.durationInSeconds,
       panelClass:['styleSnackBarSuccesfull']
     });
   }
   openSnackBarError(){
     this._snackBar.open(this.message, 'X', {
       horizontalPosition: this.horizontalPosition,
       verticalPosition: this.verticalPosition,
       duration: this.durationInSeconds,
       panelClass:['styleSnackBarError']
     });
   }
 }
 