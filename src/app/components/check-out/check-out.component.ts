import { Component, OnInit } from '@angular/core';
import { CartService } from '../shopping-cart/services/cart.service';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  public shoppingCartItems$: Observable<Product[]> = of([]);
  public shoppingCartItems: Product[] = [];
  public totalAmount: number;
  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.shoppingCartItems$ = this.cartService.getItems();
    this.shoppingCartItems$.subscribe((item) => this.shoppingCartItems = item);
    this.cartService.getTotalAmount().subscribe((val) => this.totalAmount = val);
  }

  public completed(cartItems) {
    this.cartService.clearAllCart();
    this.router.navigate(['/order-success']);
  }
}
