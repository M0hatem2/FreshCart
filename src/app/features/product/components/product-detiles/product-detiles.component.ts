import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detiles',
  templateUrl: './product-detiles.component.html',
  styleUrl: './product-detiles.component.css',
})
export class ProductDetilesComponent implements OnInit {
  productId: string | null = null;
  productDetiles: product = {} as product;
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  // Injecting services
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    // اشتراك مباشر على المتغيرات داخل الرابط
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
        if (this.productId) {
          this.getProductDetiles(this.productId);
        } else {
          console.warn('No product ID found in route.');
        }
      },
      error: (err) => {
        console.error('Error getting route params:', err);
      },
    });
  }

  // جلب تفاصيل المنتج من السيرفيس
  getProductDetiles(id: string): void {
    this.productsService.getProductDetails(id).subscribe({
      next: ({ data }) => {
        this.productDetiles = data;
        console.log('✅ Product Details:', data);
      },
      error: (err) => {
        console.error('❌ Error fetching product details:', err);
      },
    });
  }
  addToCart(): void {
    if (!this.productDetiles?._id) return;

    this.cartService.addToCart(this.productDetiles._id).subscribe({
      next: (res) => {
        this.toastr.success('تمت إضافة المنتج إلى السلة');
        this.cartService.cartCounter.set(res.numOfCartItems);
      },
      error: () => {
        this.toastr.error('حدث خطأ أثناء إضافة المنتج');
      },
    });
  }
}
