import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { httpInterceptorProviders } from './interceptors';
import { ProductService } from './components/products/services/product.service';

const toastrConfig = {
  timeOut: 3000,
  positionClass: 'toast-bottom-right',
  preventDuplicates: true,
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthRoutingModule,
    ToastrModule.forRoot(toastrConfig)
  ],
  providers: [
    httpInterceptorProviders,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
