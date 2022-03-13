import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from "@angular/forms";
import {UserLogin} from "../../../shared/interfaces/auth/user.login.interface";
import {AuthService} from "../../../core/services/auth/auth.service";
import {regExp} from "../../../shared/regExp/regExp";
import {SnackbarService} from "../../../shared/services/snackbar/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true
  serverAction: boolean = false;

  email = new FormControl('', [Validators.required, Validators.pattern(regExp.email)]);
  password = new FormControl('', [Validators.required, Validators.pattern(regExp.password)])

  constructor(private router: Router,
              private auth: AuthService,
              private snackbar: SnackbarService) {
  }

  ngOnInit(): void {
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter your email';
    }
    return this.email.hasError('pattern') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter your password';
    }
    return this.password.hasError('pattern') ? 'Not a valid password pattern' : '';
  }

  resetForms(): void {
    this.password.reset()
   // this.password.setErrors(null)

    this.email.reset()
   // this.email.setErrors(null)
  }

  login(): void {
    this.serverAction = true;
    let logUser: UserLogin = {
      email: this.email.value,
      password: this.password.value
    }
    this.auth.login(logUser).subscribe(() => {
      this.serverAction = false;
      this.router.navigateByUrl('private')
    }, error => {
      this.serverAction = false;
      if (error.error.msg)
        this.snackbar.openSnackBar(error.error.msg, true)

      if (error.error.wrongPassword) {
        this.password.reset()
      //  this.password.setErrors(null)
      } else {
        this.resetForms()
      }
    })
  }


}
