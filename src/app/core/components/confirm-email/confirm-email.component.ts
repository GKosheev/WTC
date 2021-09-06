import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  responseMessage: string = ''; // message we get after confirming email
  constructor(private auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.auth.confirmEmail(params['email'], params['token']).subscribe(response => {
          if (response.message)
            this.responseMessage = response.message
          else
            this.responseMessage = 'server error'
        },
        error => {
            this.responseMessage = error.error.error
        })
    })
  }

}
