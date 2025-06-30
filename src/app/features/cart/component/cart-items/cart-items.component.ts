import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { product } from '../../../product/models/product';
import { Product } from '../../models/cart-interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-items',
  imports: [],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent {
  @Input() product: Product = {} as Product;
  private readonly cartService = inject(CartService);
  @Output() removeProduct = new EventEmitter<string>()
  @Output() updateProductQTY = new EventEmitter<{ id: string, count: number }>(
    
  )

  onRemoveItem() {

    this.removeProduct.emit(this.product.product._id);
  }
  onUpdateQTY(count: number) {
    this.updateProductQTY.emit({ id: this.product.product._id, count })
  }

  clearCart() {
    this.cartService.ClearUserCart().subscribe({
      next: (response) => {
        console.log(response);
        // this.loadCart();
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
      }
    })
  }


}