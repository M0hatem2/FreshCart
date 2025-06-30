import { Component, computed, EventEmitter, inject, Output, Signal, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';
import { ProductCartComponent } from "../product-cart/product-cart.component";
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { cart } from '../../../cart/models/cart-interface';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
@Component({
  selector: 'app-product-list',
  imports: [ProductCartComponent, SearchPipe, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  allProducts: product[] = [];
  cartData: any;
  private readonly ProductsService = inject(ProductsService);
  private cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  searchTerm: any;
  counter: WritableSignal<number> = signal(0);

  price: WritableSignal<number> = signal(2);
  qty: WritableSignal<number> = signal(10);
  totalPrice: Signal<number> = computed(() => this.price() * this.qty());





  changeCounter() {

    this.qty.set(40)
    this.counter.update((value) => value + 1);
  }
  showToastr(msg: string) {
    this.toastr.success(msg, '', {
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
      positionClass: 'toast-top-right',
    });
  }

  isNew(date: string): boolean {
    const addedDate = new Date(date);
    const now = new Date();
    const diffInDays = (now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7; // المنتج يعتبر جديد لو أقل من أسبوع
  }


  getProducts() {
    this.ProductsService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allProducts = res.data;
        console.log(res.data[0].category.name);
      },
    });
  }

  addProductToCart(id: string) {
    this.cartService.addToCart(id).subscribe({
      next: (response: cart) => {
        this.cartData = response;

        const count = response.numOfCartItems; // على حسب شكل الـ response
        this.cartService.cartCounter.set(count); // هنا بتحدث قيمة الـ counter

        this.showToastr('Product added to cart!');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.getProducts();
  }
  userName: string = 'mohamed';
  @Output() gun: EventEmitter<string> = new EventEmitter();
  gunFire() {
    this.gun.emit(this.userName);
  }
}