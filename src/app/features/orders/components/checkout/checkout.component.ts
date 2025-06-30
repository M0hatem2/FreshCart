import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  msgResponse: string = '';
  isLoading: boolean = false;
  cartid: string = '';
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly orderService = inject(OrderService)
  checkoutForm = new FormGroup({

    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
  });
  getCartId() {
    this.activatedRoute.params.subscribe(
      {
        next: (params) => {
          this.cartid = params['id'];
          console.log(this.cartid);
        },
        error: (err) => {
          console.error('Error fetching cart ID:', err);
        }
      }
    );
  }

  ngOnInit() {
    this.getCartId();

  }
  submitInput() {
    this.checkoutForm.markAllAsTouched();
    if (this.checkoutForm.valid) {
      this.isLoading = true;
      console.log('Checkout data:', this.checkoutForm.value);
      this.orderService.creatCheckout(this.cartid, this.checkoutForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.msgResponse = '✅ Payment processed successfully!';
          console.log('Payment response:', response);
          window.location.href = response.session.url;
        },
        error: (error) => {
          this.isLoading = false;
          this.msgResponse = '❌ Error processing payment!';
          console.error('Payment error:', error);
        }
      })
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.msgResponse = '✅ Payment processed successfully!';
        this.checkoutForm.reset();
      }, 2000);
    }
  }
}
