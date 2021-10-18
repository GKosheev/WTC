import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {TableData} from "../../models/interfaces/UsersData";
import {map, tap} from "rxjs/operators";
import {UserProfile} from "../../models/interfaces/UserProfile";
import {MessageToUser} from "../../models/interfaces/MessageToUser";
import {environment} from "../../../../../environments/environment";

export interface MessageResponse {
  msg?: string,
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
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
    return this.http.get<UserProfile>(environment.get_user_profile_api + '/' + id).pipe(
      map((userProfile: UserProfile) => userProfile)
    )
  }

  sendMessage(message: MessageToUser): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(environment.send_message_api + '/' + message.id, message)
  }

}
