import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AuthResource} from './auth.resource';
import {catchError, tap} from 'rxjs/internal/operators';
import {throwError, BehaviorSubject} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new BehaviorSubject<User>(null);
  private returnUrl = '';

  constructor(private http: HttpClient, private authResource: AuthResource) {


  }

  public register(data: any) {
    return this.authResource.register(data)
      .pipe(catchError(this.errorHandler));
  }

  public login(data: any) {
    return this.authResource.login(data)
      .pipe(catchError(this.errorHandler), tap(response => {
        const user = new User(response.user, response.token);
        localStorage.setItem('jwt', response.token);
        this.user.next(user);
      }));
  }

  public logOut() {
    localStorage.removeItem('jwt');
    this.user.next(null);
  }

  public setReturnUrl(returnUrl) {
    this.returnUrl = returnUrl;
  }

  public getReturnUrl() {
    const returnUrl = this.returnUrl;
    this.returnUrl = '';
    return returnUrl;
  }

  private errorHandler(response) {
    if (response.error.message) {
      return throwError(response.error);
    }
    return throwError('An unknown error occurred!');

  }
}
