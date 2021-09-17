import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {regExp} from "../../../shared/regExp/regExp";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {DialogResponse} from "../../../tennis/components/user-profile/user-profile.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.pattern(regExp.email)]);
  serverAction: boolean = false;
  errorFromServer: string = ''

  constructor(private auth: AuthService,
              private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter your email';
    }
    return this.email.invalid ? 'Not a valid email pattern' : this.errorFromServer;
  }

  openSnackBar(error: boolean, message: string): void {
    let panelClass = []
    if (error) {
      panelClass = ['mat-toolbar', 'mat-warn']
      this._snackBar.open(message, 'close', {
        duration: 5000, //5 sec
        panelClass: panelClass
      })
    }
    else {
      panelClass = ['mat-toolbar', 'mat-primary']
      this._snackBar.open(message, 'close', {
        duration: 5000, //5 sec
        panelClass: panelClass
      })
    }
  }

  resetPassword(): void {
    this.email.reset()
    this.serverAction = true;
    this.auth.resetPassword(this.email.value).subscribe(data => {
        this.email.setValue('1')
        // success
        if (data.message)
          this.openSnackBar(false, data.message)
        this.serverAction = false;
      },
      error => {
        if (error.error.error)
          this.openSnackBar(true, error.error.error)
        this.serverAction = false;
      })

  }


}
