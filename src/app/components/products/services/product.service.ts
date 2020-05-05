import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    return this.http.get<Product>(`${environment.apiEndpoint}product/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchProducts(key: string): Observable<Product[]> {
    if (!key.trim()) {
      // if not search key, return empty array.
      return of([]);
    }
    return this.http.get<Product[]>(`${environment.apiEndpoint}products?key=${key}`).pipe(
      tap((data) => {
        console.log(data);
      })
    );
    // data.length ?
    //    console.log(`found heroes matching "${key}"`) :
    //    console.log(`no heroes matching "${key}"`)),
    // catchError(this.handleError<Product[]>('searchHeroes', []))
    // );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = err.error.header.errorMessage;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
