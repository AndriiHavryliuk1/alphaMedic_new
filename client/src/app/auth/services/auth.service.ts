import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

import CONSTANTS from '../../utils/constants';
import {AuthResource} from './auth.resource';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private authResource: AuthResource) { }

  getErrorMessage(formControl: FormControl) {
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

  register(data: any) {
    return this.authResource.register(data);
  }

  login(data: any) {
    return this.authResource.login(data);
  }
}
