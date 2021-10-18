import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }


  openSnackBar(message: string, error: boolean): void {
    let panelClass = []
    if (error) {
      panelClass = ['mat-toolbar', 'mat-warn']
      this._snackBar.open(message, 'close', {
        duration: 5000, //5 sec
        panelClass: panelClass
      })
    } else {
      panelClass = ['mat-toolbar', 'mat-primary']
      this._snackBar.open(message, 'close', {
        duration: 5000, //5 sec
        panelClass: panelClass
      })
    }
  }
}
