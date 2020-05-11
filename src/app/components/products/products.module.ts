import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgbModule,
    SharedModule,
    FormsModule
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
