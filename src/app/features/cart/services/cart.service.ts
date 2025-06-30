import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { cart } from '../models/cart-interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //  cartCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartCounter: WritableSignal<number> = signal<number>(0);


  constructor(private httpClient: HttpClient, private authService: AuthService) { }



  addToCart(id: any) {
    return this.httpClient.post<cart>('https://ecommerce.routemisr.com/api/v1/cart', {
      productId: id
    },
    );
  }


  updateCart(id: any, count: number): Observable<any> {
    return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/cart/' + id, {
      count
    },);
  }


  loadCartCounter() {
    const token = this.authService.getTokenFromLocalStorage();
    if (!token) {
      console.warn('No token found in localStorage');
      return;
    }

    this.GetLoggedUserCart().subscribe({
      next: (res) => {
        const count = res.numOfCartItems;
        this.cartCounter.set(count);
      },
      error: (err) => {
        console.log('Error loading cart counter:', err);
      }
    });
  }



  GetLoggedUserCart(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart/', {
      headers: {
        token: this.authService.getTokenFromLocalStorage()!

      }
    });
  }



  RemoveSpecificCartItem(id: any): Observable<any> {
    return this.httpClient.delete('https://ecommerce.routemisr.com/api/v1/cart/' + id,
    );
  }

  // Clear the entire cart for the logged-in user
  ClearUserCart(): Observable<any> {
    return this.httpClient.delete('https://ecommerce.routemisr.com/api/v1/cart',);
  }
}
