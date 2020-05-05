import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProductListComponent } from '../components/products/components/product-list/product-list.component';
import { ProductDetailComponent } from '../components/products/components/product-detail/product-detail.component';
import { ProductsRoutingModule } from '../components/products/products-routing.module';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatProgressSpinnerModule
  ],
  exports: [ProductListComponent]
})
export class ProductsModule { }
