import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedComponent } from './shared/shared.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { BlogComponent } from './blog/blog.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SharedComponent,
    ProductsComponent,
    ProductListComponent,
    BlogComponent,
    SignInComponent,
    RegisterComponent,
    ScrollToTopComponent,
    BsNavbarComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: SignInComponent },

      { path: 'checkout', component: CheckOutComponent },
      { path: 'cart', component: ShoppingCartComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
