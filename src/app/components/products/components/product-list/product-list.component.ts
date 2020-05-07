import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/components/products/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  errorMessage: string;
  loading: boolean;
  key: string;
  constructor(
    private productService: ProductService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.key = params['key'];
    });
    this.key ? this.searchProduct(this.key) : this.loadProducts();
  }

  public loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.productList = data;
      this.loading = true;
    });
  }

  public searchProduct(key: string) {
    this.productService.searchProducts(key).subscribe(data => {
      this.productList = data;
      this.loading = true;
    });
  }

}
