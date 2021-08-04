import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IProfile} from "../../interfaces/iprofile";
import {IProfileEdit} from "../../interfaces/iprofile-edit";
import {HttpClient} from "@angular/common/http";
import {pluck, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private USER_PROFILE_URL = '';
  private SAVE_CHANGES_URL = '';

  private user$ = new BehaviorSubject<IProfile | null>(null)

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  loadUserProfile(): void{
    /*
    this.auth.getUser()
      .subscribe(user => {
        this.setUserProfile(user.info)
      })
    */
  }

  setUserProfile(user: IProfile | null): void {
    this.user$.next(user)
  }

  getUserProfile(): Observable<IProfile | null> {
    return this.user$.asObservable()
  }

}
