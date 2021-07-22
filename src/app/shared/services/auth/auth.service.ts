import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {IUserRegister} from "../../interfaces/i-user-register";
import {catchError, pluck, tap} from "rxjs/operators";

import {TokenStorage} from './token.storage';
import {IUserLogin} from "../../interfaces/i-user-login";
import {IToken} from "../../interfaces/itoken";
import {Router} from "@angular/router";
import {BoundEventAst} from "@angular/compiler";

interface AuthResponse {
  token: IToken;
  user: User;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new BehaviorSubject<User | null>(null);
  private user: User = {} as User

  constructor(private http: HttpClient, private tokenStorage: TokenStorage, private router: Router) {}

  login(login: IUserLogin): Observable<User> {
    let email = login.email
    let password = login.password
    ///api/auth/login
    return this.http
      .post<AuthResponse>('http://localhost:5000/api/auth/login', {email, password})
      .pipe(
        tap(({token, user}) => {
          this.setUser(user)
          this.tokenStorage.saveToken(token)
          console.log("token.token: " + token.token)
          console.log("token.expires: " + token.expires)
        }),
        pluck('user')
      )
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<AuthResponse>('http://localhost:5000/api/auth/register', {userRegister})
      .pipe(
        tap(({token, user}) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      )
  }

  setUser(user: User | null): void {
    if (user){
      user.isAdmin = user.roles.includes('admin')
    }

    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  me(): Observable<User | null>{
    return this.http.get<AuthResponse>('http://localhost:5000/api/auth/me').pipe(
      tap(({user}) => this.setUser(user)),
      pluck('user'),
      catchError(() => of(null))
    )
  }

  logOut(): void {
    this.tokenStorage.signOut();
    this.setUser(null);
    this.router.navigateByUrl('/login')
  }


  getAuthorizationHeaders(){
    const token: string | null = this.tokenStorage.getToken() || '';
    return { Authorization: `Bearer ${token}` }
  }


  checkTheUserOnFirstLoad(): Promise<User | null> {
    return this.me().toPromise().then(data => {
      console.log("data from auth.service: " + JSON.stringify(data))
      return data
    })
  }


  isTokenStillValid(): void {
    this.me().toPromise().then(token => {
     console.log("isTokenStillValid: " + token)
      if (token === null){
          this.logOut()
      }
    });
  }
}
