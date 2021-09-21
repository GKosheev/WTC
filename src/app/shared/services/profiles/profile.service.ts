import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Profile} from "../../interfaces/profile/profile.interface";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../../environments/environment";

interface IEditProfileResponse {
  message?: string;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userID: string = '';
  private profile$ = new BehaviorSubject<Profile | undefined>(undefined)

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  get id() {
    return this.userID
  }

  loadUserProfile(): void {
    this.auth.getUser()
      .subscribe(user => {
        this.setUserProfile(user?.profile)
        if (user?._id !== undefined) {
          this.userID = user?._id
        }
      })
  }

  setUserProfile(user: Profile | undefined): void {
    this.profile$.next(user)
  }

  getUserProfile(): Observable<Profile | undefined> {
    this.loadUserProfile()
    return this.profile$.asObservable()
  }

  saveChanges(profile: Profile | undefined, userID: string): Observable<IEditProfileResponse> {
    return this.http.post<IEditProfileResponse>(environment.save_changes_api, {id: userID, profile: profile})
  }

}
