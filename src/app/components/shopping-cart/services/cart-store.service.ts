import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart.model';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartStoreService {
  private cartStoreSubject = new BehaviorSubject<Cart[]>([]);
  
  constructor( ) { }

  public get cartStore(): Cart[] {
    return this.cartStoreSubject.getValue();
  }

  public set cartStore(val: Cart[]) {
    this.cartStoreSubject.next(val);
  }

  public addCartItem(product: Product, quantity: number) {
    const tmpItem = { ...product, quantity };
    this.cartStore = [
      ...this.cartStore, 
      tmpItem
    ];
  }
}
