import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toastrService: ToastrService) { }
    intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
        return next.handle(request).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    err = err.error.header.errorMessage;
                }
                this.toastrService.error(err);
                return throwError(err);
            })
        );
    }
}
