import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

export const httpHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();
  const modifiedRequest = req.clone({
    headers: req.headers.append('auth-token', authToken),
  });
  return next(modifiedRequest);
};
