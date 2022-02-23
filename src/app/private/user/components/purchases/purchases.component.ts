import {Component, OnDestroy, OnInit} from '@angular/core';
import {PurchasesService} from "../../services/purchases/purchases.service";
import {Observable, of, Subscription} from "rxjs";
import {Purchase} from "../../interfaces/purchases/Purchase";


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit, OnDestroy {
  allPurchases$: Observable<Purchase[] | null> = of(null)
  loadPurchases: Subscription | null = null

  constructor(private purchasesService: PurchasesService) {
  }

  ngOnInit(): void {
    this.loadPurchases = this.purchasesService.loadPurchases().subscribe()
    this.allPurchases$ = this.purchasesService.getPurchases()
  }

  ngOnDestroy() {
    this.loadPurchases?.unsubscribe()
  }
}
