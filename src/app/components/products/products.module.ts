import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ProductService
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductsModule { }
