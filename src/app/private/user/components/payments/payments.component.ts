import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentsService} from "../../services/payments/payments.service";
import {ShortPayment} from "../../interfaces/payments/ShortPayment";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";
import {Observable, Subscription} from "rxjs";
import {DeletePaymentInfo} from "../../interfaces/payments/DeletePaymentInfo";
import {ShortPaymentCB} from "../../interfaces/payments/ShortPaymentCB";
import {MatDialog} from "@angular/material/dialog";
import {TestPurchaseComponent} from "../test-purchase/test-purchase.component";


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent implements OnInit, OnDestroy {
  paymentServerAction = false;

  allPayments: ShortPaymentCB[] = []
  cachedPayments: ShortPaymentCB[] = []

  paymentsFromService: Observable<ShortPayment[] | null>
  totalPrice: number = 0;

  loadPaymentsSub: Subscription;
  paymentsFromServiceSub: Subscription

  constructor(private paymentsService: PaymentsService,
              private auth: AuthService,
              private _snackbarService: SnackbarService,
              private dialog: MatDialog) {
    this.paymentsFromService = this.paymentsService.getPayments()
    this.loadPaymentsSub = this.paymentsService.loadPayments().subscribe()
    this.paymentsFromServiceSub = this.paymentsService.getPayments().subscribe(payments => {
      this.allPayments = []
      if (!payments || !payments.length)
        return;

      payments.forEach(payment => this.allPayments.push({
        shortPayment: payment,
        isSelected: this.cachedPayments.some(cPayment => cPayment.shortPayment._id === payment._id && cPayment.isSelected)
      }))
      this.updateOnChange()
    })
  }

  ngOnInit() {
  }

  countAllPrice(): void {
    this.totalPrice = 0;
    this.allPayments.forEach(payment => {
      if (payment.isSelected)
        this.totalPrice += payment.shortPayment.price * payment.shortPayment.quantity
    })
  }

  selectAll(): void {
    if (this.allPayments.some(payment => !payment['isSelected']))
      this.allPayments.forEach(payment => payment.isSelected = true)
    else
      this.allPayments.forEach(payment => payment.isSelected = false)

    this.updateOnChange()
  }

  isAnythingSelected(): boolean {
    return this.allPayments.some(payment => payment.isSelected)
  }

  selectAllCheckBoxStatus(): boolean {
    return this.allPayments.every(payment => payment.isSelected)
  }

  payForAllSelected(): void {
    this.paymentServerAction = true;
    const allSelectedPayments: ShortPayment[] = []
    this.allPayments.filter(payment => payment.isSelected).forEach(payment => allSelectedPayments.push(payment.shortPayment))
    this.buyAllItems(allSelectedPayments)
  }

  updateOnChange(): void {
    this.countAllPrice()
    this.cachedPayments = this.allPayments
  }


  buyItem(item: ShortPayment) {
    this.paymentServerAction = true;
    this.paymentsService.payForOneItem(item).subscribe(response => {
      this.paymentServerAction = false;
      window.location.href = response.url
      return;
    }, error => {
      this.loadPaymentsSub = this.paymentsService.loadPayments().subscribe()
      this.paymentServerAction = false
      if (error.error.msg)
        this._snackbarService.openSnackBar(error.error.msg, true)
    })
  }

  buyAllItems(items: ShortPayment[]) {
    this.paymentServerAction = true;
    this.paymentsService.payForAllItems(items).subscribe(response => {
      this.paymentServerAction = false;
      window.location.href = response.url
      return;
    }, error => {
      this.loadPaymentsSub = this.paymentsService.loadPayments().subscribe()
      this.paymentServerAction = false;
      if (error.error.msg)
        this._snackbarService.openSnackBar(error.error.msg, true)
    })
  }

  deleteOneItem(item: ShortPayment) {
    this.paymentServerAction = true
    this.paymentsService.deletePayments([{type: item.type, id: item._id}]).subscribe(response => {
      this.paymentServerAction = false
      this.loadPaymentsSub = this.paymentsService.loadPayments().subscribe()
      if (response.msg)
        this._snackbarService.openSnackBar(response.msg, false)
      return;
    }, error => {
      this.loadPaymentsSub = this.paymentsService.loadPayments().subscribe()
      this.paymentServerAction = false
      if (error.error.msg)
        this._snackbarService.openSnackBar(error.error.msg, true)
      return;
    })
  }

  deleteManyPayments(items: ShortPayment[]) {
    this.paymentServerAction = true
    const itemsToDelete: DeletePaymentInfo[] = []
    items.forEach(item => itemsToDelete.push({id: item._id, type: item.type}))
    this.paymentsService.deletePayments(itemsToDelete).subscribe(response => {
      this.paymentServerAction = false
      this.loadPaymentsSub = this.paymentsService.loadPayments().subscribe()
      this.totalPrice = 0;
      if (response.msg)
        this._snackbarService.openSnackBar(response.msg, false)
      return;
    }, error => {
      this.loadPaymentsSub = this.paymentsService.loadPayments().subscribe()
      this.paymentServerAction = false
      if (error.error.msg)
        this._snackbarService.openSnackBar(error.error.msg, true)
      return;
    })
  }

  deleteAllSelected(): void {
    this.paymentServerAction = true
    const allSelectedPayments: ShortPayment[] = []
    this.allPayments.filter(payment => payment.isSelected).forEach(payment => allSelectedPayments.push(payment.shortPayment))
    this.deleteManyPayments(allSelectedPayments)
  }


  getLengthOfSelectedPays(): number {
    return this.allPayments.filter(payment => payment.isSelected).length
  }

  ngOnDestroy() {
    this.loadPaymentsSub.unsubscribe()
    this.paymentsFromServiceSub.unsubscribe()
  }

  testPurchase() {
    this.dialog.open(TestPurchaseComponent, {
      width: '500px'
    })
  }
}
