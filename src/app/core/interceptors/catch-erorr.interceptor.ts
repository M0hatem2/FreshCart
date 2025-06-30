import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const catchErorrInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((err) => {
    alert(err.message)
    return throwError(() => err)
  }))
    ;
};
