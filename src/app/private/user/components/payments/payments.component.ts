import {Component, OnInit} from '@angular/core';
import {PaymentsService} from "../../services/payments/payments.service";
import {ShortPayment} from "../../interfaces/payments/ShortPayment";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payments: ShortPayment[] = []
  serverLoad = false;
  serverItemPurchaseLoad = false;

  constructor(private paymentsService: PaymentsService, private auth: AuthService, private _snackbarService: SnackbarService) {
    this.serverLoad = true
    this.paymentsService.loadPayments().subscribe(payments => {
      this.serverLoad = false;
      if (payments)
        this.payments = payments
    }, error => {
      this.serverLoad = false
      if (error.error.msg)
        this._snackbarService.openSnackBar(error.error.msg, true)
    })
  }

  ngOnInit() {
    this.getPayments()
  }


  getPayments() {
    this.serverLoad = true
    this.paymentsService.getPayments().subscribe(payments => {
      this.serverLoad = false
      if (payments)
        this.payments = payments
    }, error => {
      this.serverLoad = false
      if (error.error.msg)
        this._snackbarService.openSnackBar(error.error.msg, true)
    })
  }

  buyItem(item: ShortPayment) {
    this.serverItemPurchaseLoad = true;
    this.auth.getUser().subscribe(user => {
      if (!user)
        return this.auth.logOut()
      this.paymentsService.payForOneItem(user.clubCardId, item).subscribe(response => {
        this.serverItemPurchaseLoad = false;
        window.location.href = response.url
        return;
      }, error => {
        this.serverItemPurchaseLoad = false
        if (error.error.msg)
          this._snackbarService.openSnackBar(error.error.msg, true)
      })
    })
  }

  buyAllItems(items: ShortPayment[]) {
    this.serverItemPurchaseLoad = true;
    this.auth.getUser().subscribe(user => {
      if (!user)
        return this.auth.logOut()
      this.paymentsService.payForAllItems(user.clubCardId, items).subscribe(response => {
        this.serverItemPurchaseLoad = false;
        window.location.href = response.url
        return;
      })
    }, error => {
      this.serverItemPurchaseLoad = false;
      if (error.error.msg)
        this._snackbarService.openSnackBar(error.error.msg, true)
    })
  }

}
