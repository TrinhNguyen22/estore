import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  errorMessage: string;
  redirectUrl: string;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string) {
    return this.http.post<any>(`${environment.API_ENDPOINT}auth/login`, { email, password })
      .pipe(
        map(user => {
        let userObj = { email: user.email, token: user.token };
        localStorage.setItem('currentUser', JSON.stringify(userObj));
        this.currentUserSubject.next(user);
        return user;
      }),
        catchError(this.handleError)
      );
  }

  public isLoggedIn() {
    if (this.currentUserValue) {
      return true;
    }
    return false;
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);

      if (error.error.header.status === 400) {
        this.errorMessage = error.error.header.errorMessage;
      } else {
        this.errorMessage = 'Something bad happened. Please try again later.';
      }
    }
    return throwError(this.errorMessage);
  }
}
