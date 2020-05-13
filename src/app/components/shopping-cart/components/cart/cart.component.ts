import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from '../../services/cart.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

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
    private cartService: CartService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastrService: ToastrService
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
      this.openConfirmationDialog(item);
    }
  }

  public openConfirmationDialog(item: Product) {
    this.confirmationDialogService.confirm(
      'Please confirm',
      'Are you sure you want to remove this item from cart?'
    )
    .then((confirmed) => {
      if (confirmed) {
        this.cartService.removeFromCart(item);
        this.toastrService.success(`Item ${item.name} has been removed from your cart.`);
      }
    })
    .catch(() => this.toastrService.info('Saving items in your cart.'));
  }

  public updateCart(shoppingCartItems: Product[], isUpdate: boolean) {
    this.cartService.updateCart(shoppingCartItems);
    isUpdate ? this.toastrService.success('Your shopping cart has been updated.') : '';
  }
}
