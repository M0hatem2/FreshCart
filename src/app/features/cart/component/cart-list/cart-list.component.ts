import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { cart } from '../../models/cart-interface';
import { CartItemsComponent } from "../cart-items/cart-items.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemsComponent, CommonModule, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
  cartItems: cart = {} as cart;
  isLoading: boolean = false;
  private readonly cartService = inject(CartService);

  ngOnInit() {
    this.loadCart();
  }

  // تحميل محتوى الكارت
  loadCart() {
    this.cartService.GetLoggedUserCart().subscribe({
      next: (response) => {
        this.cartItems = response;
        this.isLoading = true;
        this.cartService.cartCounter.set(response.numOfCartItems); // تحديث العداد
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      }
    });
  }

  // إزالة منتج
  removeItemFromCart(id: string) {
    this.cartService.RemoveSpecificCartItem(id).subscribe({
      next: (response) => {
        this.cartItems = response;
        this.cartService.cartCounter.set(response.numOfCartItems); // تحديث العداد
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
      }
    });
  }

  // تحديث الكمية
  updateQTY(id: string, count: number) {
    this.cartService.updateCart(id, count).subscribe({
      next: (response) => {
        this.cartItems = response;
        this.cartService.cartCounter.set(response.numOfCartItems); // تحديث العداد
      },
      error: (error) => {
        console.error('Error updating quantity:', error);
      }
    });
  }

  // تفريغ الكارت
  clearCart() {
    this.cartService.ClearUserCart().subscribe({
      next: (response) => {
        this.cartItems = response;
        this.cartService.cartCounter.set(0); // لأن الكارت فاضي
        this.loadCart();
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
      }
    });
  }

  // حساب السعر الكلي (لو عايز تفعلها)
  getTotalPrice(): number {
    if (!this.cartItems?.data?.products) return 0;
    return this.cartItems.data.products.reduce((total, product) => {
      return total + (product.price * product.count);
    }, 0);
  }
}
