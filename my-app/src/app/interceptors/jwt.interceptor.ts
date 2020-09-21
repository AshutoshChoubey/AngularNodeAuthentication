import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("JwtInterceptor");
    let currentUser = this.auth.isLoggedIn();
    if (currentUser && this.auth.getJwtToken()) {
        request = request.clone({
            setHeaders: {
                Authorization: `${this.auth.getJwtToken()}`
            }
        });
    }

    return next.handle(request);
  }
}
