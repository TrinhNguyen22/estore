import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/products/components/product-list/product-list.component';
import { AuthGuard } from './auth/helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog',
    loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'check-out',
    loadChildren: () => import('./components/check-out/check-out.module').then(m => m.CheckOutModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./components/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
