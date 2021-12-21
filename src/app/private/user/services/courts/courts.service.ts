import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {tap} from "rxjs/operators";
import {GeneralCourtInfo} from "../../interfaces/courts/GeneralCourtInfo";
import {Courts} from "../../interfaces/courts/Courts";


@Injectable({
  providedIn: 'root'
})
export class CourtsService {
  private shortCourtsInfo$ = new BehaviorSubject<GeneralCourtInfo[] | null>(null)

  constructor(private http: HttpClient) {
  }

  getShortCourts(): Observable<GeneralCourtInfo[] | null> {
    return this.shortCourtsInfo$.asObservable()
  }

  setCourtsInfo(courtsInfo: GeneralCourtInfo[] | null): void {
    this.shortCourtsInfo$.next(courtsInfo)
  }

  loadCourtInfo(): Observable<GeneralCourtInfo[] | null> {
    return this.http.get<GeneralCourtInfo[] | null>(environment.get_courts_general_info).pipe(tap(courtsInfo => {
      this.setCourtsInfo(courtsInfo)
      return
    }))
  }

  loadCourt(courtType: string, date: string): Observable<Courts | null> {
    return this.http.get<Courts | null>(environment.get_courts + '/' + courtType + '/' + date)
  }


}
