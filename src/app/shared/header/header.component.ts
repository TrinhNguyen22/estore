import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  filteredProducts: Product[] = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  public get isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public search(key: string): void {
    console.log(key);
    this.productService.searchProducts(key).subscribe(
      (data) => this.filteredProducts = data
    );
  }

}
