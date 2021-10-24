import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-first-agreement',
  templateUrl: './dialog-first-agreement.component.html',
  styleUrls: ['./dialog-first-agreement.component.scss']
})
export class DialogFirstAgreementComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<DialogFirstAgreementComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {}

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
