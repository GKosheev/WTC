import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("authToken");
    // if (!idToken)
    //   this.auth.logOut();

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", idToken)
      });

      return next.handle(cloned);
    } else {

      return next.handle(req);
    }
  }
}
