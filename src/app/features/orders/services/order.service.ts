import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private auth: AuthService) {}
  creatCheckout(cartId: string, formData: any): Observable<any> {
    const returnurl = 'http://localhost:4200/user';
    return this.http.post<any>(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${returnurl}`,
      {
        shippingAddress: formData,
      },
      {
        headers: {
          token: this.auth.getTokenFromLocalStorage()!,
        },
      }
    );
  }
}
