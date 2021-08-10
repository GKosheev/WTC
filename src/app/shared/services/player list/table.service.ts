import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ITableData} from "../../interfaces/i-table-data";
import {tap} from "rxjs/operators";

interface ITableResponse {
  id: string,
  user: ITableData
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private GET_USERS_URL = 'http://localhost:5000/api/table/users';
  private users$ = new BehaviorSubject<ITableResponse[] | undefined>(undefined)

  constructor(private http: HttpClient) {
  }


  loadTableData(): Observable<ITableResponse[]> {
    return this.http.get<ITableResponse[]>(this.GET_USERS_URL)
     /* // if data will be needed more than in 1 component
      .pipe(
      tap(data => {
        this.setTableData(data)
      })
    )
      */
  }

  setTableData(data: ITableResponse[]): void {
    this.users$.next(data)
  }

}
