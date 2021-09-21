import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {UserRegister} from "../../interfaces/auth/user.register.interface";
import {catchError, pluck, tap} from "rxjs/operators";

import {TokenStorage} from './token.storage';
import {UserLogin} from "../../interfaces/auth/user.login.interface";
import {Token} from "../../interfaces/token.interface";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

interface AuthResponse {
  token: Token;
  user: User;
}

interface ConfirmResponse {
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenStorage: TokenStorage, private router: Router) {
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

  register(user: UserRegister): Observable<User> {
    return this.http.post<AuthResponse>(environment.register_api, {user})
      .pipe(
        tap(({token, user}) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      )
  }

  setUser(user: User | null): void {
    if (user) {
      user.isAdmin = user.roles.includes('admin')
    }

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
    // this.router.navigateByUrl('/login')
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
    this.me().toPromise().then(token => {
      if (token === null) {
        this.logOut()
      }
    });
  }

  confirmEmail(email: string, token: string): Observable<ConfirmResponse> {
    return this.http.get<ConfirmResponse>(`${environment.confirm_email_api}/${email}/${token}`)
  }

  resendLink(email: string): Observable<ConfirmResponse> {
    return this.http.post<ConfirmResponse>(environment.resend_link_api, {email})
  }

  forgotPassword(email: string): Observable<ConfirmResponse> {
    return this.http.post<ConfirmResponse>(environment.forgot_password_api, {email})
  }

  resetPassword(email: string, token: string, newPassword: string): Observable<ConfirmResponse> {
    return this.http.post<ConfirmResponse>(`${environment.reset_password_api}/${email}/${token}`, {password: newPassword})
  }
}
