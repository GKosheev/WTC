import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {UserProfile} from "../../../shared/interfaces/table/user.profile.interface";
import {TableService} from "../../../shared/services/player list/table.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageDialog, MessageDialogComponent} from "../message-dialog/message-dialog.component";
import {MessageFormat} from "../../../shared/interfaces/table/message.format.interface";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface DialogResponse {
  message: string,
  hasError: boolean
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private userId$: Observable<string> = this.activatedRoute.params.pipe(
    map((params: Params) => params['id'])
  )
  user$: Observable<UserProfile> = this.userId$.pipe(
    switchMap((userId: string) => this.tableService.loadUserData(userId))
  )
  twitterValid = false;
  instagramValid = false;
  facebookValid = false;

  message: MessageFormat = {} as MessageFormat;
  response: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private tableService: TableService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.twitterValid = this.twitter(user.twitter)
      this.instagramValid = this.facebook(user.facebook)
      this.facebookValid = this.instagram(user.instagram)
    },
      error => {
      this.router.navigateByUrl('**')})
  }

  twitter(link: string): boolean {
    // TODO twitter regExp
    return false;
  }

  instagram(link: string): boolean {
    // TODO instagram regExp
    return false;
  }

  facebook(link: string): boolean {
    // TODO facebook regExp
    return false;
  }

  openMessageDialog(): void {
    let dialogRef: MatDialogRef<MessageDialogComponent, MessageDialog> = {} as MatDialogRef<MessageDialogComponent, any>
    this.userId$.subscribe(id => {
      this.message.id = id
      dialogRef = this.dialog.open(MessageDialogComponent, {
        width: '400px',
        data: {
          message: this.message,
          response: this.response
        }
      })
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar(result.response)
      }
    },
      error => {
        this.openSnackBar(error.response)
      })
  }

  openSnackBar(response: DialogResponse): void {
    let panelClass = []
    if (!response.hasError)
      panelClass = ['mat-toolbar', 'mat-primary']
    else
      panelClass = ['mat-toolbar', 'mat-warn']

    this._snackBar.open(response.message, 'close', {
      duration: 5000, //5 sec
      panelClass: panelClass
    })
  }

}
