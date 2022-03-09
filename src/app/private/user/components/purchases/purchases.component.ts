import {Component, OnDestroy, OnInit} from '@angular/core';
import {PurchasesService} from "../../services/purchases/purchases.service";
import {Observable, of, Subscription} from "rxjs";
import {Purchase} from "../../interfaces/purchases/Purchase";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit, OnDestroy {
  loadPurchases: Subscription | null = null
  itemsToIssue: Observable<Purchase[] | undefined> = of(undefined)
  issuedItems: Observable<Purchase[] | undefined> = of(undefined)

  constructor(private purchasesService: PurchasesService) {
  }

  ngOnInit(): void {
    this.loadPurchases = this.purchasesService.loadPurchases().subscribe()
    this.itemsToIssue = this.purchasesService.getPurchases().pipe(
      map(projects => projects?.filter(item => item.issued === false))
    )
    this.issuedItems = this.purchasesService.getPurchases().pipe(
      map(projects => projects?.filter(item => item.issued === true))
    )
  }

  ngOnDestroy() {
    this.loadPurchases?.unsubscribe()
  }
}
