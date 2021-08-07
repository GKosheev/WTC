import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IProfile} from "../../interfaces/iprofile";
import {IProfileEdit} from "../../interfaces/iprofile-edit";
import {HttpClient} from "@angular/common/http";
import {pluck, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private USER_PROFILE_URL = '';
  private SAVE_CHANGES_URL = '';

  private user$ = new BehaviorSubject<IProfile | undefined>(undefined)

  constructor(private router: Router, private http: HttpClient, private auth: AuthService) {
  }

  loadUserProfile(): void {
    this.auth.getUser()
      .subscribe(user => {
        this.setUserProfile(user?.profile)
      })

  }

  setUserProfile(user: IProfile | undefined): void {
    this.user$.next(user)
  }

  getUserProfile(): Observable<IProfile | undefined> {
    this.loadUserProfile()
    return this.user$.asObservable()
  }

  saveChanges(user: IProfile | undefined): void {
    // TODO
    this.router.navigateByUrl('/profile')
  }

}
