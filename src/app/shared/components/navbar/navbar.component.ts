import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../../core/services/translate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  counter =computed(() => this.cartService.cartCounter());
  isMenuOpen: boolean = false;

  private cartService = inject(CartService);
  private translateService = inject(MyTranslateService);

  @Input() layout!: string;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.clear();
  }



  setLanguage(lang: string) {
    this.translateService.changeLang(lang);
  }

  ngOnInit(): void {
    this.cartService.loadCartCounter();

    //  this.cartService.cartCounter.subscribe({
    //  next: (value) => {
    //   this.counter = value;
    //   },
    //   error: (err) => {
    //       console.log(err);
    //   },
    //  });
  }
}
