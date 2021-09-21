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
    ///api/auth/login
    return this.http
      .post<AuthResponse>('http://localhost:5000/api/auth/login', {email, password})
      .pipe(
        tap(({token, user}) => {
          this.setUser(user)
          this.tokenStorage.saveToken(token)
        }),
        pluck('user')
      )
  }

  register(user: UserRegister): Observable<User> {
    return this.http.post<AuthResponse>('http://localhost:5000/api/auth/register', {user})
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
    return this.http.get<AuthResponse>('http://localhost:5000/api/auth/me').pipe(
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
    return this.http.get<ConfirmResponse>(`http://localhost:5000/api/auth/confirmation/${email}/${token}`)
  }

  resendLink(email: string): Observable<ConfirmResponse> {
    return this.http.post<ConfirmResponse>('http://localhost:5000/api/auth/resendLink', {email})
  }

  resetPassword(email: string): Observable<ConfirmResponse> {
    return this.http.post<ConfirmResponse>('http://localhost:5000/api/password/forgot-password', {email})
  }

  changePassword(email: string, token: string, newPassword: string): Observable<ConfirmResponse> {
    return this.http.post<ConfirmResponse>(`http://localhost:5000/api/password/reset-password/${email}/${token}`, {password: newPassword})
  }
}
