import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private itemsInCart: Product[] = [];

  constructor() {
    let cartItemStorage = localStorage.getItem('cartItems');
    this.itemsInCartSubject = cartItemStorage 
    ? new BehaviorSubject<Product[]>(JSON.parse(cartItemStorage))
    : new BehaviorSubject([]);
    
    this.itemsInCartSubject.subscribe((item) => this.itemsInCart = item);
  }

  public addToCart(item: Product, quantity: number) {
    const tmpItem = { ...item, quantity };
    this.itemsInCartSubject.next([...this.itemsInCart, tmpItem]);
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getTotalQuantity(): Observable<number> {
    return this.itemsInCartSubject.pipe(map((items: Product[]) => {
      return items.reduce((prev, curr: Product) => {
        return prev + curr.quantity;
      }, 0);
    }));
  }

  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.pipe(map((items: Product[]) => {
      return items.reduce((prev, curr: Product) => {
        return prev + (curr.quantity * curr.originalPrice);
      }, 0);
    }));
  }

  public updateCart(cartItems: Product[]) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.itemsInCartSubject.next(cartItems);
    return cartItems; 
  }
}
