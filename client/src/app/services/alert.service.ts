import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  showAlert(message: string, timeout: number, type: string) {
    this.snackBar.open(message, null, {
      duration: timeout
    });
  }

  public getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'Це поле обов`язкове';
    } else if (formControl.hasError('email')) {
      return 'Неправильно введено email';
    } else if (formControl.hasError('matDatepickerParse')) {
      return 'Невірна дата';
    } else if (formControl.hasError('minlength')) {
      return 'Value must has more then 6 length';
    }
    return 'Невідома помилка';
  }
}
