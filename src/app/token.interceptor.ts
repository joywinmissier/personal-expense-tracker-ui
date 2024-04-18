import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StoreService } from './service/store.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storeService = inject(StoreService);
  const router = inject(Router);
  const headers = req.headers
  .set('Authorization', storeService.userToken() ? storeService.userToken() : localStorage.getItem('token') ?? '' )
  const cloneReq = req.clone({ headers });

  return next(cloneReq).pipe(catchError(err => {
    if ([401, 403].includes(err.status)) {
        storeService.setUserToken('');
        storeService.setLoggedIn(false);
        localStorage.removeItem('token');
        router.navigate(['/authenticate']);
    }
    return throwError(() => err);
  }))
};
