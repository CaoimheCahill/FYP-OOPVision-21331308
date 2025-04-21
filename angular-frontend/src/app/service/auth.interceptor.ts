import {HttpInterceptorFn} from '@angular/common/http';
import {UserService} from './user.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('[authInterceptorFn] Interceptor is called!');

  const userService = inject(UserService);
  const token = userService.getToken();

  // Skip token for login or register requests
  if (
    req.url.includes('/api/users/login') ||
    req.url.includes('/api/users/register')
  ) {
    return next(req);
  }

  console.log('[authInterceptorFn] token:', token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
