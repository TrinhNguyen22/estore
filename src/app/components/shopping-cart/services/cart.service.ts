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
    const itemExistInCart = this.itemsInCart.find((curr) => curr._id === item._id);
    if (itemExistInCart) {
      itemExistInCart.quantity += quantity;
      this.itemsInCartSubject.next([...this.itemsInCart]);
    } else {
      const tmpItem = { ...item, quantity };
      this.itemsInCartSubject.next([...this.itemsInCart, tmpItem]);
    }
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

  public removeFromCart(item: Product) {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter((curr) => curr._id !== item._id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
    localStorage.setItem('cartItems', JSON.stringify(itemsWithoutRemoved));
  }

  public clearAllCart() {
    localStorage.removeItem('cartItems');
    this.itemsInCartSubject.next([]);
  }
}
