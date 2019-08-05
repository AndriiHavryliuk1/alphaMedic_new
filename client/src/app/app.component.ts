import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  viewType = 'home';

  public changeViewCallback(newViewType) {
    debugger;
    this.viewType = newViewType;
  }
}