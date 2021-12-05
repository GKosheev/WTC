import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {CheckoutSession} from "../../interfaces/payments/CheckoutSession";
import {ItemPayment} from "../../interfaces/payments/ItemPayment";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";
import {ShortPayment} from "../../interfaces/payments/ShortPayment";
import {DeletePaymentInfo} from "../../interfaces/payments/DeletePaymentInfo";

interface CheckoutSessionResponse {
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private allPayments$ = new BehaviorSubject<ShortPayment[] | null>(null)
  private paymentType = {
    store: 'store',
    subscription: 'sub',
    court: 'court'
  }

  constructor(private http: HttpClient, private _snackBarService: SnackbarService) {
  }

  loadPayments(): Observable<ShortPayment[] | null> {
    return this.http.get<ShortPayment[] | null>(environment.get_all_payments_api).pipe(tap(payments => {
      this.setPayments(payments)
      return;
    }))
  }

  getPayments(): Observable<ShortPayment[] | null> {
    return this.allPayments$.asObservable()
  }

/*  private updatePayments(): void {
    this.loadPayments().subscribe()
  }*/

  setPayments(payments: ShortPayment[] | null): void {
    this.allPayments$.next(payments)
  }

  payForOneItem(item: ItemPayment) {
    const checkoutSession: CheckoutSession | undefined = this.itemCheckoutSession(item)
    console.log(JSON.stringify(checkoutSession))
    return this.http.post<CheckoutSessionResponse>(environment.create_checkout_session_api, checkoutSession)
  }

  payForAllItems(items: ItemPayment[]) {
    const checkoutSession: CheckoutSession | undefined = this.itemsCheckoutSession(items)
    return this.http.post<CheckoutSessionResponse>(environment.create_checkout_session_api, checkoutSession)
  }

  deletePayments(payments: DeletePaymentInfo[]) {
    return this.http.post<{ msg?: string }>(environment.delete_payments_api, {payments: payments})/*.pipe(tap(() => this.updatePayments()))*/
  }


  private itemCheckoutSession(item: ItemPayment) {
    const checkoutSession: CheckoutSession = {
      courtIds: [],
      storeIds: [],
      subIds: []
    }
    switch (item.type) {
      case this.paymentType.store:
        checkoutSession.storeIds?.push(item._id)
        break;
      case this.paymentType.court:
        checkoutSession.courtIds?.push(item._id)
        break;
      case this.paymentType.subscription:
        checkoutSession.subIds?.push(item._id)
        break;
      default:
        this._snackBarService.openSnackBar(`Unknown type: ${item.type}`, true)
        return;
    }
    return checkoutSession
  }

  private itemsCheckoutSession(items: ItemPayment[]) {
    const checkoutSession: CheckoutSession = {
      courtIds: [],
      storeIds: [],
      subIds: []
    }
    items.forEach(item => {
      switch (item.type) {
        case this.paymentType.store:
          checkoutSession.storeIds?.push(item._id)
          break;
        case this.paymentType.court:
          checkoutSession.courtIds?.push(item._id)
          break;
        case this.paymentType.subscription:
          checkoutSession.subIds?.push(item._id)
          break;
        default:
          this._snackBarService.openSnackBar(`Unknown type: ${item.type}`, true)
          return;
      }
    })
    return checkoutSession
  }
}
