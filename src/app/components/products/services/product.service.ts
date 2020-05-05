import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../../../shared/models/product.model';

@Injectable()
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('products?page=1');
  }

  getProduct(id: string): Observable<Product | undefined> {
    return this.http.get<Product>(`product/${id}`);
  }

  searchProducts(key: string): Observable<Product[]> {
    if (!key.trim()) {
      return of([]);
    }
    return this.http.get<Product[]>(`products?key=${key}`);
  }

  getCategories() {
    return this.http.get<any>('categories');
  }
}
