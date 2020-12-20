import {AfterContentInit, Component} from '@angular/core';

import {LoadingDialogService} from './services/app/loading-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  isLoading = true;

  constructor(loadingDialogService: LoadingDialogService) {
    loadingDialogService.showHideSubject.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  ngAfterContentInit(): void {
    this.isLoading = false;
  }
}
