import {AfterViewInit, Component, ElementRef, Input, OnInit, Output} from '@angular/core';
import {endOfDay, startOfDay} from 'date-fns';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar',
  templateUrl: './xd-calendar.component.html',
  styleUrls: ['./xd-calendar.component.css']
})
export class XdCalendarComponent implements OnInit {
  @Input() date = new Date();
  @Output() events = [];
  constructor() { }

  ngOnInit(): void {

  }

  public dateChangeHandler(newDate) {
    this.date = newDate;
  }

}
