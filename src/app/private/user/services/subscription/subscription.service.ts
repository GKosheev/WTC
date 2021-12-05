import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SubType} from "../../interfaces/subscription/SubType";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SubscriptionService {

  constructor(private http: HttpClient) {
  }


  getAllSubs(): Observable<SubType[] | null> {
    return this.http.get<SubType[] | null>(environment.get_all_subscriptions_api)
  }

  addSubToPayments(subType: string, subName: string) {
    return this.http.post<{ msg?: string }>(environment.subscription_to_payments_api, {
      subType: subType,
      subName: subName
    })
  }
}
