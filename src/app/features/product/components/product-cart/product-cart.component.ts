import { StockStatusPipe } from './../../../../shared/pipes/stock-status.pipe';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-cart',
  imports: [RouterLink, DatePipe, CommonModule, StockStatusPipe],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css' 
})
export class ProductCartComponent {
  @Input() product!: product;
  @Output() addToCart: EventEmitter<string> = new EventEmitter();

  isNew(date: string): boolean {
    const addedDate = new Date(date);
    const now = new Date();
    const diffInDays = (now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7; // المنتج يعتبر جديد لو أقل من أسبوع
  }
  
  onAddToCart(id: string) { 
    this.addToCart.emit(this.product.id);
  }
}