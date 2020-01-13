import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

import {AuthResource} from './auth.resource';
import {catchError, tap} from 'rxjs/internal/operators';
import {throwError, Subject} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new Subject<User>();

  constructor(private http: HttpClient, private authResource: AuthResource) {


  }

  public getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    } else if (formControl.hasError('email')) {
      return 'Email invalid';
    } else if (formControl.hasError('matDatepickerParse')) {
      return 'Date invalid';
    } else if (formControl.hasError('minlength')) {
      return 'Value must has more then 6 length';
    }
    return '';
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

  private errorHandler(response) {
    if (response.error.message) {
      return throwError(response.error);
    }
    return throwError('An unknown error occurred!');

  }
}
