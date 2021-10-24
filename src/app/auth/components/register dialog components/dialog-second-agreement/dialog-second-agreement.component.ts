import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogFirstAgreementComponent} from "../dialog-first-agreement/dialog-first-agreement.component";

@Component({
  selector: 'app-dialog-second-agreement',
  templateUrl: './dialog-second-agreement.component.html',
  styleUrls: ['./dialog-second-agreement.component.scss']
})
export class DialogSecondAgreementComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<DialogFirstAgreementComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngOnInit(): void {}

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
