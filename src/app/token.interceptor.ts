import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StoreService } from './service/store.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storeService = inject(StoreService);
  const headers = req.headers
  .set('Authorization', storeService.userToken());
  const cloneReq = req.clone({ headers });
  return next(cloneReq);
};
