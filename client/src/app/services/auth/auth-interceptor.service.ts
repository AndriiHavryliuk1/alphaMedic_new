import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      const jwt = user && user.getToken();
      if (jwt) {
        const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + jwt) });
        return next.handle(clonedRequest);
      }
      return next.handle(req);
    }));

  }
}
