import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/components/shopping-cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  filteredProducts: Product[] = [];
  public searchValue: string;
  public totalItem;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService
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

  public search(key: string) {
    let keyword = key.trim();
    if (!keyword) {
      return;
    }
    this.router.navigate(['/product-list'], { queryParams: { key: keyword } });
  }

  public getTotalQuantity(): Observable<number> {
    return this.cartService.getTotalQuantity();
  }

}
