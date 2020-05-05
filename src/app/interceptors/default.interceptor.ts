import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request).pipe(
      map(resp => {
        if (resp instanceof HttpResponse && resp.body && resp.body.hasOwnProperty('body')) {
          const data = resp.body.body;
          resp = resp.clone({ body: data });
          return resp;
        }
        return resp;
      })
    );
  }
}
