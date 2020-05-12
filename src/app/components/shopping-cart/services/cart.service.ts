import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private itemsInCart: Product[] = [];

  constructor(
    private toastrService: ToastrService
  ) {
    this.itemsInCartSubject.subscribe((item) => this.itemsInCart = item);
  }

  public addToCart(item: Product, quantity: number) {
    const tmpItem = { ...item, quantity };
    this.itemsInCartSubject.next([...this.itemsInCart, tmpItem]);

    this.toastrService.success(`${item.name} added to your cart.`);
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
}
