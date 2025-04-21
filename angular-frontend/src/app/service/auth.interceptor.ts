import {HttpInterceptorFn} from '@angular/common/http';
import {UserService} from './user.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService);
  const token = userService.getToken();

  // Skip token for login or register requests
  if (
    req.url.includes('/api/users/login') ||
    req.url.includes('/api/users/register')
  ) {
    return next(req);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
