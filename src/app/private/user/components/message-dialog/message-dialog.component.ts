import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageToUser} from "../../models/interfaces/MessageToUser";
import {UsersService} from "../../services/users/users.service";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";

export interface MessageDialog {
  message: MessageToUser
}

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {
  sendButtonClicked = false;
  messageSent = false;

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent, MessageDialog>,
              @Inject(MAT_DIALOG_DATA) public data: MessageDialog,
              private tableService: UsersService,
              private snackbar: SnackbarService) {
  }

  ngOnInit(): void {
  }

  sendMessage(): void {
    this.sendButtonClicked = true;

    this.tableService.sendMessage(this.data.message).subscribe(response => {
        if (response.msg)
          this.snackbar.openSnackBar(response.msg, false)
        this.messageSent = true
        this.dialogRef.close(this.data)
      },
      error => {
        if (error.error.msg)
          this.snackbar.openSnackBar(error.error.msg, true)
        this.messageSent = true
        this.dialogRef.close(this.data)
      })
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
