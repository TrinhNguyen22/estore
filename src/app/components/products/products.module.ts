import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatProgressSpinnerModule,
    NgbModule
  ],
  providers: [
    ProductService
  ],
  exports: [
    ProductListComponent,
    CategoriesComponent
  ]
})
export class ProductsModule { }
