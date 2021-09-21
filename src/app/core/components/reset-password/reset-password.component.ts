import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {regExp} from "../../../shared/regExp/regExp";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  hidePassword: boolean = true

  password = new FormControl('', [Validators.required, Validators.pattern(regExp.password),])

  passwordPattern = {hasUppercaseLetter: false, hasDigit: false, hasRequiredLength: false, hasSymbol: false}

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private _snackBar: MatSnackBar) {
  }

  errorFromServer = ""
  serverAction: boolean = false;

  ngOnInit(): void {
  }

  checkPasswordPattern(): void {
    let enteredPassword: string = this.password.value

    this.passwordPattern = {
      hasUppercaseLetter: /(?=.*[A-Z])/.test(enteredPassword),
      hasDigit: /\d/.test(enteredPassword),
      hasRequiredLength: enteredPassword.length >= 8,
      hasSymbol: /[#?!@$%^&*-]+/.test(enteredPassword)
    }
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter your password';
    }
    return this.password.hasError('pattern') ? 'Not a valid password pattern' : this.errorFromServer; // '' may contain validation from server
  }

  openSnackBar(error: boolean, message: string): void {
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

  changePassword(): void {
    this.serverAction = true;
    this.route.params.subscribe(params => {
      console.log("email+ password: " + params['email'] + params['token'])
      this.auth.changePassword(params['email'], params['token'], this.password.value).subscribe(response => {
        if (response.message)
          this.openSnackBar(false, response.message)
        this.serverAction = false;
      }, error => {
        if (error.error.error)
          this.openSnackBar(true, error.error.error)
        this.serverAction = false;
      })
    })
    this.password.reset()
  }
}



