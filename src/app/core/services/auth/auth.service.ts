import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../../../shared/interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {UserRegister} from "../../../shared/interfaces/auth/user.register.interface";
import {catchError, pluck, tap} from "rxjs/operators";

import {TokenStorage} from './token.storage';
import {UserLogin} from "../../../shared/interfaces/auth/user.login.interface";
import {Token} from "../../../shared/interfaces/token.interface";
import {environment} from "../../../../environments/environment";

interface AuthResponse {
  token: Token;
  user: User;
}

interface Response {
  msg?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorage) {
  }


  setUser(user: User | null): void {
    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  me(): Observable<User | null> {
    return this.http.get<AuthResponse>(environment.me_api).pipe(
      tap(({user}) => this.setUser(user)),
      pluck('user'),
      catchError(() => of(null))
    )
  }

  logOut(): void {
    this.tokenStorage.signOut();
    this.setUser(null);
  }

  getAuthorizationHeaders() {
    const token: string | null = this.tokenStorage.getToken() || '';
    return {Authorization: `Bearer ${token}`}
  }

  checkTheUserOnFirstLoad(): Promise<User | null> {
    return this.me().toPromise().then(data => {
      if (data === null) {
        this.logOut()
      }
      return data
    })
  }

  isTokenStillValid(): void {
    this.me().toPromise().then(user => {
      if (user === null) {
        this.logOut()
      }
    });
  }

  login(login: UserLogin): Observable<User> {
    let email = login.email
    let password = login.password
    return this.http
      .post<AuthResponse>(environment.login_api, {email, password})
      .pipe(
        tap(({token, user}) => {
          this.setUser(user)
          this.tokenStorage.saveToken(token)
        }),
        pluck('user')
      )
  }

  register(user: UserRegister): Observable<Response> {
    return this.http.post<Response>(environment.register_api, {user})
  }

  confirmEmail(token: string): Observable<Response> {
    return this.http.post<Response>(`${environment.confirm_email_api}/${token}`, {})
  }

  resendConfirmEmailLink(email: string): Observable<Response> {
    return this.http.post<Response>(environment.resend_link_api, {email})
  }

  forgotPassword(email: string): Observable<Response> {
    return this.http.post<Response>(environment.forgot_password_api, {email: email})
  }

  resetPassword(token: string, newPassword: string): Observable<Response> {
    return this.http.post<Response>(`${environment.reset_password_api}/${token}`, {password: newPassword})
  }
}
