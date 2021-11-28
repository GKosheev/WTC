import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SnackbarService} from "../../../shared/services/snackbar/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild, CanActivate {
  constructor(private auth: AuthService, private _snackBar: SnackbarService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {
    // console.log('can activate (role guard)')
    return this.hasPermission(route)
  }


  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | boolean {
    //   console.log('can activate child (role guard)')
    return this.hasPermission(route)
  }

  private hasPermission(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.auth.getUser().pipe(map((user) => {
      const expectedRoles: string[] = route.data.roles
      if (expectedRoles[0] === 'public')
        return true;
      let roles: string[] = []
      if (user?.roles)
        roles = user.roles

      //console.log("expected: " + expectedRoles + ' roles: ' + roles)
      const roleMatches = roles.findIndex(role => expectedRoles.indexOf(role) !== -1)
      if (roleMatches < 0)
        this._snackBar.openSnackBar(`You don't have permissions to visit this page`, true, 2)
      return roleMatches >= 0
    }))

  }

}
