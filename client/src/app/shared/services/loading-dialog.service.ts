import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingDialogService {
  showHideSubject = new Subject();
  constructor() {}

  show() {
    this.showHideSubject.next(true);
  }

  hide() {
    this.showHideSubject.next(false);
  }
}
