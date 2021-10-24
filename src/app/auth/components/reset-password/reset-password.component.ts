import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {regExp} from "../../../shared/regExp/regExp";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth/auth.service";
import {SnackbarService} from "../../../shared/services/snackbar/snackbar.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  hidePassword: boolean = true

  password = new FormControl('', [Validators.required, Validators.pattern(regExp.password)])
  passwordPattern = {hasUppercaseLetter: false, hasDigit: false, hasRequiredLength: false}

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private snackbar: SnackbarService,
              private router: Router) {
  }

  serverAction: boolean = false;

  ngOnInit(): void {
  }

  onKeyPress(): void {
    setTimeout(() => this.checkPasswordPattern(), 250)
  }

  checkPasswordPattern(): void {
    let enteredPassword: string = this.password.value

    this.passwordPattern = {
      hasUppercaseLetter: /(?=.*[A-Z])/.test(enteredPassword),
      hasDigit: /\d/.test(enteredPassword),
      hasRequiredLength: enteredPassword.length >= 8
    }
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter your password';
    }
    return this.password.hasError('pattern') ? 'Not a valid password pattern' : '';
  }


  resetPassword(): void {
    this.serverAction = true;
    let password = this.password.value
    this.password.reset()
    this.route.params.subscribe(params => {
      this.auth.resetPassword(params['token'], password).subscribe(response => {
        this.serverAction = false;
        if (response.msg)
          this.snackbar.openSnackBar(response.msg, false)
        this.router.navigate(['auth/login'])
        return;
      }, error => {
        this.serverAction = false;
        if (error.error.msg)
          this.snackbar.openSnackBar(error.error.msg, true)
        if (error.error.forgotPassword)
          this.router.navigate(['auth/forgot-password'])

        if (error.error.signup)
          this.router.navigate(['auth/register'])
        return;
      })
    })
  }
}
