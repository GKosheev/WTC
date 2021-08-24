import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageFormat} from "../../../shared/interfaces/table/message.format.interface";
import {TableService} from "../../../shared/services/player list/table.service";

export interface MessageDialog {
  message: MessageFormat,
  response: {
    message: string,
    hasError: boolean
  }
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
              private tableService: TableService) {
  }

  ngOnInit(): void {
  }

  sendMessage(): void {
    this.sendButtonClicked = true;

    this.tableService.sendMessage(this.data.message).subscribe(response => {
        this.data.response = {
          message: 'Message was sent',
          hasError: false
        }
        this.messageSent = true
        this.dialogRef.close(this.data)
      },
      error => {
        if (error)
          this.data.response = {
            message: 'Something went wrong',
            hasError: true
          }
        this.messageSent = true
        this.dialogRef.close(this.data)
      })
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
