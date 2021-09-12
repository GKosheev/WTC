import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  responseMessage: string; // message we get after confirming email
  login: boolean;
  signup: boolean;
  resendLink: boolean;

  dataLoaded: boolean; // waiting for the response from server

  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.login = false;
    this.signup = false;
    this.resendLink = false;
    this.dataLoaded = false;
    this.responseMessage = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.auth.confirmEmail(params['email'], params['token']).subscribe(response => {
          if (response.message) {
            this.responseMessage = response.message
            this.login = true
            this.dataLoaded = true
          } else
            this.responseMessage = 'server error'
        },
        error => {
          console.log(JSON.stringify(error))
          this.checkResponseErrors(error)
          this.responseMessage = error.error.error
          this.dataLoaded = true;
        })
    })
  }

  resetAllVariables(): void {
    this.login = false;
    this.signup = false;
    this.resendLink = false;
    this.dataLoaded = false;
    this.responseMessage = '';
  }

  checkResponseErrors(error: any): void {
    if (error.error.signup)
      this.signup = true

    else if (error.error.login)
      this.login = true

    else if (error.error.resendLink)
      this.resendLink = true;
  }

  resend(): void {
    this.resetAllVariables()
    this.route.params.subscribe(params => {
      this.auth.resendLink(params['email']).subscribe(response => {
          if (response.message)
            this.responseMessage = response.message
          this.dataLoaded = true;
        },
        error => {
          this.checkResponseErrors(error)
          this.responseMessage = error.error.error
          this.dataLoaded = true;
        })
    })
  }
}
