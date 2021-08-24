import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageFormat} from "../../../shared/interfaces/table/message.format.interface";
import {TableService} from "../../../shared/services/player list/table.service";

export interface MessageDialog {
  message: MessageFormat,
  response: string
}

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MessageDialog,
              private tableService: TableService) {
  }

  ngOnInit(): void {
  }

  sendMessage(): void {
    this.tableService.sendMessage(this.data.message).subscribe(response => {
      if (response.error){
        this.data.response = 'Something went wrong'
      }
      if (response.message){
        this.data.response = 'Message was sent'
      }
    })
  }
  closeDialog(): void {
    this.dialogRef.close()
  }
}
