import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StoreConfig} from "../../interfaces/store/StoreConfig";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) {
  }

  getAllStoreItems(): Observable<StoreConfig[] | null> {
    return this.http.get<StoreConfig[] | null>(environment.get_all_store_items_api)
  }

  addStoreItemToPayments(_id: string, name: string, quantity: number): Observable<{ msg?: string }> {
    return this.http.post<{ msg?: string }>(environment.buy_store_item_api, {
      id: _id,
      name: name,
      quantity: quantity
    })
  }
}


