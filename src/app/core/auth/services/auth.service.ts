import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  registerUser(user: any): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', user);
  }

  loginUser(user: any): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', user);
  }
  decodeToken() {
    try {
      const decoded = jwtDecode(localStorage.getItem('userToken')!);
      console.log(decoded);
    }
    catch (error) {
      this.logOut();
    }

  }
  saveTokenToLocalStorage(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userToken', token);
    }
  }

  getTokenFromLocalStorage() {
    return typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
  }

  isAuthenticated(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('userToken');
  }

  logOut() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userToken');
    }
    this.router.navigate(['/auth/login']);
  }
}

