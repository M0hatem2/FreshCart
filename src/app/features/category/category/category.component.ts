import { Component, inject, OnInit, Output } from '@angular/core';
import { ProductCartComponent } from '../../product/components/product-cart/product-cart.component';
import { ProductsService } from '../../product/services/products.service';
import { CartService } from '../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { product } from '../../product/models/product';
import { FormsModule } from '@angular/forms';
 
 @Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProductCartComponent,    FormsModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  allProducts: product[] = [];
  isLoading: boolean = false;
  searchTerm: any; 

 
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getProducts();
  }
  get filteredProducts(): product[] {
    if (!this.searchTerm || !this.searchTerm.trim()) {
      return this.allProducts;
    }
  
    const term = this.searchTerm.toLowerCase();
  
    return this.allProducts.filter(product =>
      product.category.name?.toLowerCase().includes(term) // تأكد إن الخاصية موجودة
    );
  }
  
  // تحميل المنتجات
  getProducts(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.isLoading = false;
      }
    });
  }

  // إضافة منتج للكارت
  addProductToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.toastr.success('Product added to cart successfully');
        this.cartService.cartCounter.set(res.numOfCartItems); // تحديث عدد العناصر في الكارت
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this.toastr.error('Failed to add product to cart');
      }
    });
  }
}
