import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-redirect',
  template: ''
})
export class RedirectComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user/home']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
