import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {TableData} from "../../interfaces/table/table.data.interface";
import {map, tap} from "rxjs/operators";
import {UserProfile} from "../../interfaces/table/user.profile.interface";
import {MessageFormat} from "../../interfaces/table/message.format.interface";
import {environment} from "../../../../environments/environment";

export interface MessageResponse {
  message?: string,
  error?: string
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private users$ = new BehaviorSubject<TableData[] | undefined>(undefined)

  constructor(private http: HttpClient) {
  }


  loadTableData(): Observable<TableData[]> {
    return this.http.get<TableData[]>(environment.get_users_api)
  }

  setTableData(data: TableData[]): void {
    this.users$.next(data)
  }

  loadUserData(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(environment.get_user_profile + '/' + id).pipe(
      map((userProfile: UserProfile) => userProfile)
    )
  }

  sendMessage(message: MessageFormat): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(environment.send_message_api, message)
  }

}
