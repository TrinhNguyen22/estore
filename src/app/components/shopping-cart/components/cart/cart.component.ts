import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public shoppingCartItems$: Observable<Product[]> = of([]);
  public shoppingCartItems: Product[] = [];
  public totalAmount: number;
  quantity: number;
  maxQuantity: number = 10;
  minQuantity: number = 1;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.shoppingCartItems$ = this.cartService.getItems();
    this.shoppingCartItems$.subscribe((item) => this.shoppingCartItems = item);
    this.cartService.getTotalAmount().subscribe((val) => this.totalAmount = val);
  }

  public plusQuantity(item: Product) {
    item.quantity = item.quantity + 1;
  }

  public minusQuantity(item: Product) {
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
    } else {
      console.log('remove?');
    }
  }

  public updateCart(shoppingCartItems: Product[]) {
    this.cartService.updateCart(shoppingCartItems);
  }
}
