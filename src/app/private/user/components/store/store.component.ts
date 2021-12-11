import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from "../../services/store/store.service";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";
import {PaymentsService} from "../../services/payments/payments.service";
import {Observable, Subscription} from "rxjs";
import {StoreConfig} from "../../interfaces/store/StoreConfig";
import {CustomStoreConfig} from "../../interfaces/store/CustomStoreConfig";


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  allStoreItems: Observable<CustomStoreConfig[] | null>
  serverLoadStoreItems: boolean = false;
  serverLoadAddStorePayment: boolean = false;
  loadAllPayments: Subscription
  loadStoreItems: Subscription

  // itemsFromService: Observable<StoreConfig[] | null>

  constructor(private storeService: StoreService,
              private snackBar: SnackbarService,
              private paymentService: PaymentsService) {
    this.serverLoadStoreItems = true
    this.loadAllPayments = this.paymentService.loadPayments().subscribe(() => this.serverLoadStoreItems = false, error => this.serverLoadStoreItems = false)
    this.loadStoreItems = this.updateStoreItems()
    this.allStoreItems = this.storeService.getCustomStoreItems()
  }

  ngOnInit(): void {
  }

  updateStoreItems(): Subscription {
    this.serverLoadAddStorePayment = true
    return this.storeService.loadStoreItems().subscribe(() => this.serverLoadAddStorePayment = false,
      error => {
        this.serverLoadAddStorePayment = false
        if (error.error.msg) this.snackBar.openSnackBar(error.error.msg, false)
      })
  }

  addItemToPayments(_id: string, name: string, quantity: number) {
    this.serverLoadAddStorePayment = true
    this.storeService.addStoreItemToPayments(_id, name, quantity).subscribe(async response => {
      this.loadAllPayments = await this.paymentService.loadPayments().subscribe()
      this.loadStoreItems = this.updateStoreItems()
      this.serverLoadAddStorePayment = false
      if (response.msg)
        this.snackBar.openSnackBar(response.msg, false, 5)
    }, error => {
      this.loadStoreItems = this.updateStoreItems()
      this.serverLoadAddStorePayment = false
      if (error.error.msg)
        this.snackBar.openSnackBar(error.error.msg, true, 5)
    })
  }

  ngOnDestroy() {
    this.loadAllPayments.unsubscribe()
  }
}
