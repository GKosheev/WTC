import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {IUserRegister} from "../../interfaces/i-user-register";
import {catchError, pluck, tap, first} from "rxjs/operators";

import { TokenStorage } from './token.storage';
import {IUserLogin} from "../../interfaces/i-user-login";

interface AuthResponse {
  token: string;
  user: User;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new BehaviorSubject<User | null>(null);
  private user: User = {} as User

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
  }

  login(login: IUserLogin): void {
    // player: User | undefined
    this.setUser(this.user)
    /*
    return this.http.post<AuthResponse>('/api/auth/login', userRegister)
      .pipe(
        tap(({token, user}) => {
          this.setUser(user);
          this.tokenStorage.saveToken(token);
        }),
        pluck('user')
      )
     */

  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<AuthResponse>('/api/auth/register', {userRegister})
      .pipe(
        tap(({token, user}) => {
          this.setUser(user);
         // this.tokenStorage.saveToken(token);
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
    return this.http.get<AuthResponse>('/api/auth/me').pipe(
      tap(({user}) => this.setUser(user)),
      pluck('user'),
      catchError(() => of(null))
    )
  }

  signOut(): void {
   // this.tokenStorage.signOut();
    this.setUser(null);
  }


  getAuthorizationHeaders(){
    const token: string | null = this.tokenStorage.getToken() || '';
    return { Authorization: `Bearer ${token}` }
  }

  /*
  checkTheUserOnFirstLoad(): Promise<User | null> {
    return first(this.me())
  }
  */

}
