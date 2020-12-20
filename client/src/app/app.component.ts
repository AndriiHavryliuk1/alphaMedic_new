import {AfterContentInit, Component} from '@angular/core';

import {LoadingDialogService} from './services/app/loading-dialog.service';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  isLoading = true;

  constructor(loadingDialogService: LoadingDialogService, dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('uk-UA');
    dateAdapter.getFirstDayOfWeek = () => 1;
    loadingDialogService.showHideSubject.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  ngAfterContentInit(): void {
    this.isLoading = false;
  }
}
