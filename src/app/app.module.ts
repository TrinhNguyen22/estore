import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedComponent } from './shared/shared.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { BlogComponent } from './components/blog/blog.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

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
    ShoppingCartComponent,
    CheckOutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
