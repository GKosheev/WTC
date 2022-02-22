import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from "../../services/store/store.service";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";
import {PaymentsService} from "../../services/payments/payments.service";
import {Observable, of, Subscription} from "rxjs";
import {CustomStoreConfig} from "../../interfaces/store/CustomStoreConfig";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemTag} from "../../interfaces/store/ItemTag";


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  allStoreItems: Observable<CustomStoreConfig[] | null> = of(null)
  serverLoadStoreItems: boolean = false;
  serverLoadAddStorePayment: boolean = false;
  loadAllPayments: Subscription | null = null
  loadStoreItems: Subscription | null = null

  loadAllTags: Subscription | null = null
  allTags: Observable<ItemTag[] | null> = of(null)
  tagSelected: boolean = false
  serverLoadTags: boolean = true;
  currentTag: string = ''
  inputValue: string = ''


  constructor(private storeService: StoreService,
              private snackBar: SnackbarService,
              private paymentService: PaymentsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentTag = params.tag
      if (params.tag) {
        this.serverLoadStoreItems = true;
        this.router.navigate(['/private/user/store'], {queryParams: {tag: this.currentTag}})
        this.loadStoreItems = this.storeService.loadStoreItems(this.currentTag).subscribe(() => this.serverLoadStoreItems = false, error => this.serverLoadStoreItems = false)
        this.allStoreItems = this.storeService.getCustomStoreItems()

      } else {
        this.loadAllTags = this.storeService.loadAllTags().subscribe(() => this.serverLoadTags = false, error => this.serverLoadTags = false)
        this.allTags = this.storeService.getTags()
      }
    })
  }


  goBack(): void {
    this.allStoreItems = of(null)
    this.allTags = of(null)
    this.router.navigate(['/private/user/store'])
  }

  updateStoreItems(tag: string): Subscription {
    this.serverLoadAddStorePayment = true
    return this.storeService.loadStoreItems(tag).subscribe(() => this.serverLoadAddStorePayment = false,
      error => {
        this.serverLoadAddStorePayment = false
        if (error.error.msg) this.snackBar.openSnackBar(error.error.msg, false)
      })
  }

  addItemToPayments(_id: string, name: string, quantity: number) {
    this.route.queryParamMap
    this.serverLoadAddStorePayment = true
    this.storeService.addStoreItemToPayments(_id, name, quantity).subscribe(async response => {
      this.loadAllPayments = await this.paymentService.loadPayments().subscribe()
      this.loadStoreItems = this.updateStoreItems(this.currentTag)
      this.serverLoadAddStorePayment = false
      if (response.msg)
        this.snackBar.openSnackBar(response.msg, false, 5)
    }, error => {
      this.loadStoreItems = this.updateStoreItems(this.currentTag)
      this.serverLoadAddStorePayment = false
      if (error.error.msg)
        this.snackBar.openSnackBar(error.error.msg, true, 5)
    })
  }

  hideFilteredItem(item: CustomStoreConfig) {
    if (!this.inputValue)
      return false;
    return item.itemInfo.name.toLowerCase().indexOf(this.inputValue.toLowerCase()) === -1
  }

  ngOnDestroy() {
    this.loadAllPayments?.unsubscribe()
    this.loadAllTags?.unsubscribe()
    this.loadStoreItems?.unsubscribe()
  }
}
