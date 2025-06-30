import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { url } from 'inspector';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService)
  if (req.url.includes('cart') || req.url.includes('order')) {
    req = req.clone({
      setHeaders: {
        token: auth.getTokenFromLocalStorage()!
      }
    });
  }

  console.log('Auth Interceptor', req);

  return next(req);
};
