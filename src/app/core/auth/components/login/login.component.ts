import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidationComponent } from '../../../../shared/components/validation/validation.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  msgResponse: string = ''
  isLoading: boolean = true;
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)



  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })




  submitInput() {
    this.isLoading = false;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = true;
          if (res.message === 'success') {
            this.authService.saveTokenToLocalStorage(res.token)
            this.authService.decodeToken()
            this.router.navigate(['/user/home'])
          }

        },
        error: (err) => {
          this.msgResponse = err.error.message
          console.log(err);
          this.isLoading = true;
        }
      })

    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  showPasswordVisible: boolean = false;
  showPassword() {
    this.showPasswordVisible = !this.showPasswordVisible;
  }




}
