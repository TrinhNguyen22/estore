import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  public shoppingCartItems$: Observable<Product[]> = of([]);
  public shoppingCartItems: Product[] = [];
  public totalAmount: number;

  constructor(
    private cartService: CartService
  ) { 
    this.shoppingCartItems$ = this.cartService.getItems();

    this.shoppingCartItems$.subscribe((item) => this.shoppingCartItems = item);

    this.cartService.getTotalAmount().subscribe((val) => this.totalAmount = val);
  }
}
