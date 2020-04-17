import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CheckOutComponent } from './components/check-out/check-out.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: SignInComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: 'cart', component: ShoppingCartComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
