import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from 'src/app/components/shopping-cart/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  filteredProducts: Product[] = [];
  public searchValue: string;
  public totalQuantity: number;
  keyChanged: BehaviorSubject<string> = new BehaviorSubject(null);
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.keyChanged.asObservable()
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(key => {
        this.searchValue = key;
        this.router.navigate(['/product-list'], { queryParams: { key } });
      });

    this.cartService.getTotalQuantity().subscribe((val) => this.totalQuantity = val);
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
    if (keyword.length < 2) {
      if (!keyword) {
        this.router.navigate(['/product-list']);
      }
      return;
    }
    this.keyChanged.next(key);
  }

}
