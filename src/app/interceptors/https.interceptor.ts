import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
        const url = `${environment.apiEndpoint}${request.url}`;
        return next.handle(request.clone({ url }));
    }
}
