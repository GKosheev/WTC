import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../auth/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlayerAuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.getUser().pipe(
      map(user => {
        if (user !== null){
          this.auth.isTokenStillValid()
          return true
        }
        this.router.navigateByUrl('/login')
        return false
      })
    )
  }

}
