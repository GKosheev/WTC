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
import {SnackbarService} from "../../../shared/services/snackbar/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private auth: AuthService, private snackbar: SnackbarService) {
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
        if (user !== null)
          this.snackbar.openSnackBar('You have already been authorized', false, 2)

        return user === null;
      })
    )
  }

}
