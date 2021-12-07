import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from "../../services/store/store.service";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";
import {PaymentsService} from "../../services/payments/payments.service";
import {Subscription} from "rxjs";
import {StoreConfig} from "../../interfaces/store/StoreConfig";

export interface CustomStoreConfig {
  id: string,
  name: string,
  price: number,
  quantity: number,
  images: string[],
  description: string,
  selectedQuantity: number
}


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  storeItems: CustomStoreConfig[] = []
  serverLoadStoreItems: boolean = false;
  serverLoadAddStorePayment: boolean = false;
  loadAllPayments: Subscription
  allStoreItems: Subscription

  constructor(private storeService: StoreService,
              private snackBar: SnackbarService,
              private paymentService: PaymentsService) {
    this.loadAllPayments = this.paymentService.loadPayments().subscribe()
    this.allStoreItems = this.updateStoreItems()
  }

  ngOnInit(): void {
  }

  updateStoreItems(): Subscription {
    this.serverLoadStoreItems = true
    return this.storeService.getAllStoreItems().subscribe(items => {
        this.storeItems = []
        this.serverLoadStoreItems = false
        if (items)
          items.forEach(item => this.storeItems.push({
            id: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            images: item.images,
            description: item.description,
            selectedQuantity: 1
          }))
        // this.storeItems = items
      },
      error => {
        this.serverLoadStoreItems = false
        if (error.error.msg) this.snackBar.openSnackBar(error.error.msg, false)
      })
  }

  addItemToPayments(_id: string, name: string, quantity: number) {
    this.serverLoadAddStorePayment = true
    this.storeService.addStoreItemToPayments(_id, name, quantity).subscribe(async response => {
      this.loadAllPayments = await this.paymentService.loadPayments().subscribe()
      this.allStoreItems = this.updateStoreItems()
      this.serverLoadAddStorePayment = false
      if (response.msg)
        this.snackBar.openSnackBar(response.msg, false, 5)
    }, error => {
      if (error.error.msg)
        this.snackBar.openSnackBar(error.error.msg, true, 5)
    })
  }

  ngOnDestroy() {
    this.loadAllPayments.unsubscribe()
  }
}
