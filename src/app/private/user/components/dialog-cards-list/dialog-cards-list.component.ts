import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-dialog-cards-list',
  templateUrl: './dialog-cards-list.component.html',
  styleUrls: ['./dialog-cards-list.component.scss']
})
export class DialogCardsListComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<DialogCardsListComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
