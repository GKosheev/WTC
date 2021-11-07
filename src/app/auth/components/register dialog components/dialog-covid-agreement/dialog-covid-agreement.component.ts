import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogFirstAgreementComponent } from "../dialog-first-agreement/dialog-first-agreement.component";

@Component({
  selector: 'app-dialog-covid-agreement',
  templateUrl: './dialog-covid-agreement.component.html',
  styleUrls: ['./dialog-covid-agreement.component.scss']
})
export class DialogCovidAgreementComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<DialogFirstAgreementComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void { }

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
