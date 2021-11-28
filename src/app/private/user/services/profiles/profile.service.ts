import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Profile} from "../../../../shared/interfaces/profile/profile.interface";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {environment} from "../../../../../environments/environment";
import {ProfileEdit} from "../../interfaces/profile-edit/ProfileEdit";

interface Response {
  msg?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private clubCardId: string = '';
  private profile$ = new BehaviorSubject<Profile | undefined>(undefined)

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  get id() {
    return this.clubCardId
  }

  loadUserProfile(): void {
    this.auth.getUser()
      .subscribe(user => {
        if (user)
          this.setUserProfile({
            role: user?.roles[0],
            clubCardId: user.clubCardId,
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            email: user.profile.email,
            subType: user.subscription.type,
            gender: user.profile.gender,
            phone: user.profile.phone,
            dateOfBirth: user.profile.dateOfBirth,
            rating: user.profile.rating,
            receiveClubEmails: user.profile.receiveClubEmails,
            shareMyEmail: user.profile.shareMyEmail,
            shareMyPhone: user.profile.shareMyPhone,
            twitter: user.profile.twitter,
            instagram: user.profile.instagram,
            facebook: user.profile.facebook
          })
        if (user?._id)
          this.clubCardId = user?._id
      })
  }

  setUserProfile(user: Profile | undefined): void {
    this.profile$.next(user)
  }

  getUserProfile(): Observable<Profile | undefined> {
    this.loadUserProfile()
    return this.profile$.asObservable()
  }

  saveChanges(profile: ProfileEdit | undefined, userID: string): Observable<Response> {
    return this.http.post<Response>(environment.save_changes_api, {id: userID, profile: profile})
  }

}
