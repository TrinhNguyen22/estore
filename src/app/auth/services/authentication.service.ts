import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { CartService } from 'src/app/components/shopping-cart/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string) {
    return this.http.post<any>('auth/login', { email, password })
      .pipe(
        map(user => {
          const userObj = { email: user.email, token: user.token };
          localStorage.setItem('currentUser', JSON.stringify(userObj));
          this.currentUserSubject.next(user);
          return user;
        })
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
    this.cartService.clearAllCart();
  }
}
