import {AfterContentInit, AfterViewChecked, Component} from '@angular/core';

import {setLoading} from './utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  public waitingText = 'Будь ласка зачекайте';

  ngAfterContentInit(): void {
    setLoading(false);
  }
}
