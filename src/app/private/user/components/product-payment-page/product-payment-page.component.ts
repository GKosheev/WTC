import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCardsListComponent } from '../dialog-cards-list/dialog-cards-list.component';

@Component({
  selector: 'app-product-payment-page',
  templateUrl: './product-payment-page.component.html',
  styleUrls: ['./product-payment-page.component.scss']
})
export class ProductPaymentPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openSecondAgreement() {
    const privacyPolicy = this.dialog.open(DialogCardsListComponent, {
      width: '600px'
    });

  }
}
