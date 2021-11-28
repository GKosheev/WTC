import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {map} from "rxjs/operators";
import {SnackbarService} from "../../../shared/services/snackbar/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private router: Router, private auth: AuthService, private snackbar: SnackbarService) {
  }

  canLoad(): Observable<boolean> | boolean {
    return this.isAuthorized()
  }

  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.isAuthorized()
  }

  canActivateChild(): Observable<boolean> | boolean{
    return this.isAuthorized()
  }

  private isAuthorized(): Observable<boolean> {
    return this.auth.getUser().pipe(
      map(user => {
        if (user !== null) { // TODO token validation using Moment.js
          this.auth.isTokenStillValid()
          return true
        }
        this.router.navigate(['auth/login'])
        this.snackbar.openSnackBar('Token expired, please login', true, 3)
        return false
      })
    )
  }
}
