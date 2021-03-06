import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from 'src/app/components/shopping-cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {

  product: Product | undefined;
  loading: boolean;
  quantity = 1;
  maxQuantity = 10;
  minQuantity = 1;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              private toastrService: ToastrService
              ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).subscribe(data => {
        this.product = data;
        this.loading = true;
      });
    }
  }

  public plusQuantity() {
    if (this.quantity > this.maxQuantity) {
      return;
    }
    this.quantity++;
  }

  public minusQuantity() {
    if (this.quantity <= this.minQuantity) {
      return;
    }
    this.quantity--;
  }

  public addToCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity);
    this.toastrService.success(`${product.name} added to your cart.`);
  }
}
