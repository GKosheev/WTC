import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from "@angular/forms";
import {IUserLogin} from "../../../shared/interfaces/i-user-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passRegExp: string = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
  hidePassword: boolean = true

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(this.passRegExp)])

  serverValidationError = ""

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter your email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : ''; // '' may contain validation from server
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter your password';
    }
    return this.password.hasError('pattern') ? 'Not a valid password pattern' : ''; // '' may contain validation from server
  }

  login(): void {
    let logUser: IUserLogin = {
      email: this.email.value,
      password: this.password.value
    }

    if (!this.email.invalid && !this.password.invalid) {
      //http.post, error message should be hold in "serverValidationError"
      /*
      if (serverError){
      this.serverValidationError = serverError
      }
      else
          this.router.navigate(['/home']);

       */
    }
  }


}
