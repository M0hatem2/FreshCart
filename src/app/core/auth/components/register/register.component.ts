import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup
  msgResponse: string = ''
  isLoading: boolean = true;
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly formBuilder = inject(FormBuilder)

  formInItializer() {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      rePassword: [null, [Validators.required, Validators.minLength(6)]],
    }, { validators: this.passwordsMatch.bind(this) });
  }

  submitInput() {
    this.isLoading = false;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = true;
          this.router.navigate(['/auth/login'])
        },
        error: (err) => {
          this.msgResponse = err.error.message
          console.log(err);
          this.isLoading = true;
        }
      })

    } else {
      this.registerForm.markAllAsTouched();
    }
  }


  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    return password === rePassword ? null : { passwordMismatch: true };
  }


  ngOnInit() {
    this.formInItializer()
  }

}
