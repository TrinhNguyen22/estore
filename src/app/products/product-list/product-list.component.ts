import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  errorMessage: string;
  loading: boolean;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts() {
    this.productService.getProducts().subscribe({
      next: products => {
        this.productList = products;
        this.loading = true;
      },
      error: err => this.errorMessage = err
    });
  }

}
