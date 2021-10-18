import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild, CanActivate {
  constructor(private auth: AuthService) {
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
      let roles: string[] = []
      if (user?.roles)
        roles = user.roles

     //console.log("expected: " + expectedRoles + ' roles: ' + roles)
      const roleMatches = roles.findIndex(role => expectedRoles.indexOf(role) !== -1)
      return roleMatches >= 0
    }))

  }

}
