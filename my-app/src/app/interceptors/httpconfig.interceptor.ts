import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor() {
      
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const apiURL: string = 'http://localhost:9000/api/users';
    console.log("request",request);
    console.log("request");
    
    let reqUrl: string = request.url;
    let spy: string = "http";
    if (reqUrl.search(spy) >= 0) { }
    else {
        request = request.clone({ url: apiURL + request.url });
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    if (!request.headers.has('Accept')) {
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    }

    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                 console.log('event--->>>', event);
                // this.errorDialogService.openDialog(event);
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            let data = {};
            data = {
                reason: error && error.error && error.error.reason ? error.error.reason : '',
                status: error.status
            };
            // this.errorDialogService.openDialog(data);
            // console.log('error--->>>', data);
            return throwError(error);
        }));

   //return next.handle(request);
 }
}
