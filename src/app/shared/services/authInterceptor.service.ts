import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { PersistenceService } from './persistence.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistenceService: PersistenceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.persistenceService.get('accessToken');
    request = request.clone({
      setHeaders: {
        ...(token ? { Authorization: `Token ${token}` } : {}),
      },
    });
    return next.handle(request);
  }
}
