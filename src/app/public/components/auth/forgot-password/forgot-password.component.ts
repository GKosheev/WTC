import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/services/auth/auth.service";
import {FormControl, Validators} from "@angular/forms";
import {regExp} from "../../../../shared/regExp/regExp";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.pattern(regExp.email)]);
  serverAction: boolean = false;

  constructor(private auth: AuthService,
              private snackbar: SnackbarService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter your email';
    }
    return this.email.invalid ? 'Not a valid email pattern' : ''
  }


  forgotPassword(): void {
    this.serverAction = true;
    if (!this.email.invalid) {
      let email = this.email.value;
      this.email.reset()
      this.auth.forgotPassword(email).subscribe(data => {
          this.serverAction = false;
          if (data.msg)
            this.snackbar.openSnackBar(data.msg, false)
          this.router.navigate(['auth/login'])
          return;
        },
        error => {
          this.serverAction = false;
          if (error.error.msg)
            this.snackbar.openSnackBar(error.error.msg, true)
          if (error.error.signup)
            this.router.navigate(['auth/register'])
          return;
        })
    }
  }
}
