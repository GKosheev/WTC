import { Injectable } from '@angular/core';
import {Purchase} from "../../interfaces/purchases/Purchase";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../../../../shared/services/snackbar/snackbar.service";
import {environment} from "../../../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private allPurchases$ = new BehaviorSubject<Purchase[] | null>(null)
  constructor(private http: HttpClient, private _snackBarService: SnackbarService) { }

  loadPurchases(): Observable<Purchase[] | null> {
    return this.http.get<Purchase[] | null>(environment.get_all_user_purchases_api).pipe(
      tap(purchases => this.setPurchases(purchases))
    )
  }

  getPurchases(): Observable<Purchase[] | null> {
    return this.allPurchases$.asObservable()
  }

  setPurchases(purchases: Purchase[] | null): void {
    this.allPurchases$.next(purchases)
  }
}
