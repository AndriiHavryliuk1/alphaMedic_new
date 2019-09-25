import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  showAlert(message: string, timeout: number, type: string) {
    this.snackBar.open(message, null, {
      duration: timeout,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
