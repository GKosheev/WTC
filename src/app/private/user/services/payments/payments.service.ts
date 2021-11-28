import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {CheckoutSession} from "../../interfaces/payments/CheckoutSession";
import {ItemPayment} from "../../interfaces/payments/ItemPayment";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";
import {ShortPayment} from "../../interfaces/payments/ShortPayment";

interface CheckoutSessionResponse {
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private allPayments$ = new BehaviorSubject<ShortPayment[] | undefined>(undefined)
  private paymentType = {
    store: 'store',
    subscription: 'sub',
    court: 'court'
  }

  constructor(private http: HttpClient, private _snackBarService: SnackbarService) {
  }

  loadPayments(): Observable<ShortPayment[] | undefined> {
    return this.http.get<ShortPayment[] | undefined>(environment.get_all_payments_api).pipe(tap(payments => this.setPayments(payments)))
  }

  getPayments(): Observable<ShortPayment[] | undefined> {
    return this.allPayments$.asObservable()
  }

  updatePayments(): void {
    this.loadPayments().subscribe(payments => this.setPayments(payments))
  }

  setPayments(payments: ShortPayment[] | undefined): void {
    this.allPayments$.next(payments)
  }

  payForOneItem(clubCardId: string, item: ItemPayment) {
    const checkoutSession: CheckoutSession | undefined = this.itemCheckoutSession(item)
    checkoutSession!.clubCardId = clubCardId
    console.log(JSON.stringify(checkoutSession))
    return this.http.post<CheckoutSessionResponse>(environment.create_checkout_session_api, checkoutSession)
  }

  payForAllItems(clubCardId: string, items: ItemPayment[]) {
    const checkoutSession: CheckoutSession | undefined = this.itemsCheckoutSession(items)
    checkoutSession.clubCardId = clubCardId
    return this.http.post<CheckoutSessionResponse>(environment.create_checkout_session_api, checkoutSession)
  }

  private itemCheckoutSession(item: ItemPayment) {
    const checkoutSession: CheckoutSession = {
      clubCardId: '',
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
      clubCardId: '',
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
