import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../cart/services/cart.service';
import { product } from '../../../product/models/product';
import { ProductsService } from '../../../product/services/products.service';
import { FormsModule } from '@angular/forms';
import { ProductCartComponent } from '../../../product/components/product-cart/product-cart.component';

@Component({
  selector: 'app-brand-list',
  imports: [ProductCartComponent, FormsModule
  ],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent {
  allProducts: product[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';
  brandTerm: string = '';


  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getProducts();
  }


  get filteredProducts(): product[] {
    return this.allProducts.filter(product => {
      const matchesCategory = this.searchTerm
        ? product.category?.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesBrand = this.brandTerm
        ? product.brand?.name?.toLowerCase().includes(this.brandTerm.toLowerCase())
        : true;

      return matchesCategory && matchesBrand;
    });
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
