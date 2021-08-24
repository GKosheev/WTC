import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {TableData} from "../../interfaces/table/table.data.interface";
import {map, tap} from "rxjs/operators";
import {UserProfile} from "../../interfaces/table/user.profile.interface";
import {MessageFormat} from "../../interfaces/table/message.format.interface";

export interface MessageResponse {
  message?: string,
  error?: string
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private GET_USERS_URL = 'http://localhost:5000/api/table/users';
  private GET_USER_PROFILE_URL = 'http://localhost:5000/api/table/users/'
  private POST_SEND_MESSAGE_URL = 'http://localhost:5000/api/table/send-message'
  private users$ = new BehaviorSubject<TableData[] | undefined>(undefined)

  constructor(private http: HttpClient) {
  }


  loadTableData(): Observable<TableData[]> {
    return this.http.get<TableData[]>(this.GET_USERS_URL)
    /* // if data will be needed more than in 1 component
     .pipe(
     tap(data => {
       this.setTableData(data)
     })
   )
     */
  }

  setTableData(data: TableData[]): void {
    this.users$.next(data)
  }

  loadUserData(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.GET_USER_PROFILE_URL + id).pipe(
      map((userProfile: UserProfile) => userProfile)
    )
  }

  sendMessage(message: MessageFormat): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.POST_SEND_MESSAGE_URL, message)
  }

}
