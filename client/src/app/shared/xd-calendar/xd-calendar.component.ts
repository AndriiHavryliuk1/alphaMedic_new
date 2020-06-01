import {AfterViewInit, Component, ElementRef, Input, OnInit, Output} from '@angular/core';
import {endOfDay, startOfDay} from 'date-fns';
import {DATE_STATES} from './xd-calendar.utils';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar',
  templateUrl: './xd-calendar.component.html',
  styleUrls: ['./xd-calendar.component.css']
})
export class XdCalendarComponent implements OnInit {
  @Input() date = new Date();
  @Input() dateState = DATE_STATES.MONTH;
  @Output() events = [];

  public DATE_STATES = DATE_STATES;
  constructor() { }

  ngOnInit(): void {

  }

  public dateChangeHandler(newDate) {
    this.date = newDate;
  }

  public dateStateChangeHandler(newState) {
    this.dateState = newState;
  }

}
