import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

import CONSTANTS from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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
    debugger;
    return this.http.post(CONSTANTS.SERVER_URL + "auth/signup", data).subscribe((data) => {
      console.log(data);
      return data;
    })
  };
}
