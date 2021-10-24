import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {AuthService} from "../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.isAuthorized();
  }

  canLoad(): Observable<boolean> | boolean {
    return this.isAuthorized()
  }

  canActivateChild(): Observable<boolean> | boolean {
    return this.isAuthorized()
  }

  private isAuthorized(): Observable<boolean> {
    return this.auth.getUser().pipe(
      map(user => {
        return user === null;
      })
    )
  }

}
