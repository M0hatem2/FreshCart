import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    return this.httpClient.get(environment.baseURL + 'products');

  }

  getProductDetails(id: string | null): Observable<any> {
    return this.httpClient.get(environment.baseURL + `products/${id}`);
  }
  getProductsByCategory(category: string): Observable<any> {
    return this.httpClient.get(environment.baseURL + `products/category/${category}`);
  }
}

