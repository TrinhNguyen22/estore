import { Component, OnInit } from '@angular/core';
import { CartStoreService } from '../../services/cart-store.service';
import { Cart } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList: Cart[] = [];
  constructor(
    private cartStoreService: CartStoreService
  ) { }

  ngOnInit(): void {
    this.getItemOfCart();
  }
  public getItemOfCart() {
    this.cartList = this.cartStoreService.cartStore;
  }

}
