import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
}
