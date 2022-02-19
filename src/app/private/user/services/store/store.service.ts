import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {StoreConfig} from "../../interfaces/store/StoreConfig";
import {environment} from "../../../../../environments/environment";
import {tap} from "rxjs/operators";
import {CustomStoreConfig} from "../../interfaces/store/CustomStoreConfig";
import {ItemTag} from "../../interfaces/store/ItemTag";


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private allStoreItems$ = new BehaviorSubject<StoreConfig[] | null>(null)
  private customStoreItems$ = new BehaviorSubject<CustomStoreConfig[] | null>(null)
  private allTags$ = new BehaviorSubject<ItemTag[] | null>(null)

  constructor(private http: HttpClient) {
  }

  getStoreItems(): Observable<StoreConfig[] | null> {
    return this.allStoreItems$.asObservable()
  }

  getCustomStoreItems(): Observable<CustomStoreConfig[] | null> {
    return this.customStoreItems$.asObservable()
  }

  getTags(): Observable<ItemTag[] | null> {
    return this.allTags$.asObservable()
  }

  setStoreItems(items: StoreConfig[] | null): void {
    this.allStoreItems$.next(items)
  }

  setCustomStoreItems(items: CustomStoreConfig[] | null): void {
    this.customStoreItems$.next(items)
  }

  setItemTags(tags: ItemTag[] | null): void {
    this.allTags$.next(tags)
  }

  loadStoreItems(tag: string): Observable<StoreConfig[] | null> {
    return this.http.get<StoreConfig[] | null>(environment.get_all_store_items_api,
      {params: {tag: tag}})
      .pipe(tap(items => {
        this.setStoreItems(items)
        if (items) {
          const customStoreArr: CustomStoreConfig[] = []
          items.forEach(item => customStoreArr.push({itemInfo: item, selectedQuantity: 1}))
          this.setCustomStoreItems(customStoreArr)
          return;
        }
        return;
      }))
  }

  loadAllTags(): Observable<ItemTag[] | null> {
    return this.http.get<ItemTag[] | null>(environment.get_all_tags_api).pipe(tap(tags => this.setItemTags(tags)))
  }

  addStoreItemToPayments(_id: string, name: string, quantity: number): Observable<{ msg?: string }> {
    return this.http.post<{ msg?: string }>(environment.buy_store_item_api, {
      id: _id,
      name: name,
      quantity: quantity
    })
  }
}


