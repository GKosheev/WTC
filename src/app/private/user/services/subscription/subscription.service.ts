import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SubConfig} from "../../interfaces/subscription/SubConfig";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SubscriptionService {

  constructor(private http: HttpClient) {
  }


  getAllSubs(): Observable<SubConfig[] | null> {
    return this.http.get<SubConfig[] | null>(environment.get_all_subscriptions_api)
  }

  addSubToPayments(subType: string, subName: string) {
    return this.http.post<{ msg?: string }>(environment.subscription_to_payments_api, {
      subType: subType,
      subName: subName
    })
  }
}
