import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private snackbar: SnackbarService,
              private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  serverAction: boolean = false;

  ngOnInit(): void {
    this.serverAction = true;
    this.route.params.subscribe(params => {
      this.auth.confirmEmail(params['token']).subscribe(response => {
          this.serverAction = false
          if (response.msg)
            this.snackbar.openSnackBar(response.msg, false)
          this.router.navigate(['auth/login'])
          return;
        },
        error => {
          this.serverAction = false
          if (error.error.msg && !error.error.resendLink)
            this.snackbar.openSnackBar(error.error.msg, true)

          if (error.error.resendEmailLink)
            this.router.navigate(['auth/resend-confirm-email'])
          else if (error.error.signup)
            this.router.navigate(['auth/register'])
          else
            this.router.navigate([''])

          return;
        })
    })
  }
}
