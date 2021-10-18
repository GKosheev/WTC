import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {UserProfile} from "../../models/interfaces/UserProfile";
import {UsersService} from "../../services/users/users.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageDialog, MessageDialogComponent} from "../message-dialog/message-dialog.component";
import {MessageToUser} from "../../models/interfaces/MessageToUser";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private userId$: Observable<string> = this.activatedRoute.params.pipe(
    map((params: Params) => params['userId'])
  )
  user$: Observable<UserProfile> = this.userId$.pipe(
    switchMap((userId: string) => this.tableService.loadUserData(userId))
  )
  message: MessageToUser = {} as MessageToUser;

  constructor(private activatedRoute: ActivatedRoute,
              private tableService: UsersService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  openMessageDialog(): void {
    let dialogRef: MatDialogRef<MessageDialogComponent, MessageDialog> = {} as MatDialogRef<MessageDialogComponent, any>
    this.userId$.subscribe(id => {
      this.message.id = id
      dialogRef = this.dialog.open(MessageDialogComponent, {
        width: '400px',
        data: {
          message: this.message
        }
      })
    })
    /*
    dialogRef.afterClosed().subscribe(result => {
    })
    */
  }
}
