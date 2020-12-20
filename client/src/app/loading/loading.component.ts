import {Component, Input, OnInit} from '@angular/core';
import {state, style, trigger} from '@angular/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('rotate', [
      state('run', style({
        "-webkit-animation": "rotate 0.7s linear 0s infinite",
        animation: "rotate 0.7s linear 0s infinite"
      }))
    ]),
  ]
})
export class LoadingComponent implements OnInit{
  @Input() waitingText = 'Будь ласка зачекайте';

  constructor() { }

  ngOnInit(): void {
    debugger;
  }

}
