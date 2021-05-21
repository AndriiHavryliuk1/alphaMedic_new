import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {DATE_STATES} from '../xd-calendar.utils';
import {XdCalendarService} from '../../core/services/xd-calendar.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-header',
  templateUrl: './xd-calendar-header.component.html',
  styleUrls: ['./xd-calendar-header.component.scss']
})
export class XdCalendarHeaderComponent implements OnInit {
  @Input() currentDate = new Date();
  @Input() currentDateState = DATE_STATES.MONTH;
  @Output() public dateChanged = new EventEmitter();
  @Output() public dateStateChanged = new EventEmitter();
  public headerText: string;
  public DATE_STATES = DATE_STATES;
  private months = [
    {number: 0, name: 'Січень'},
    {number: 1, name: 'Лютий'},
    {number: 2, name: 'Березень'},
    {number: 3, name: 'Квітень'},
    {number: 4, name: 'Травень'},
    {number: 5, name: 'Червень'},
    {number: 6, name: 'Липень'},
    {number: 7, name: 'Серпень'},
    {number: 8, name: 'Вересень'},
    {number: 9, name: 'Жовтень'},
    {number: 10, name: 'Листопад'},
    {number: 11, name: 'Грудень'}
  ];

  constructor(private xdCalendarService: XdCalendarService) {
  }

  public ngOnInit(): void {
    this.init();
  }

  public clickToday() {
    this.currentDate = new Date();
    this.init();
    this.dateChangeHandler();
  }

  public clickPrevious() {
    switch (this.currentDateState) {
      case DATE_STATES.MONTH:
        this.currentDate = moment(this.currentDate).subtract(1, 'months').toDate();
        break;
      case DATE_STATES.WEEK:
        this.currentDate = moment(this.currentDate).subtract(1, 'week').toDate();
        break;
      default:
        console.log('Unknown date state');
    }
    this.init();
    this.dateChangeHandler();
  }

  public changeState(newState) {
    this.currentDateState = newState;
    this.init();
    this.dateStateChanged.emit(newState);
    this.xdCalendarService.setDateState(newState);
  }

  public clickNext() {
    switch (this.currentDateState) {
      case DATE_STATES.MONTH:
        this.currentDate = moment(this.currentDate).add(1, 'months').toDate();
        break;
      case DATE_STATES.WEEK:
        this.currentDate = moment(this.currentDate).add(1, 'week').toDate();
        break;
      default:
        console.log('Unknown date state');
    }
    this.init();
    this.dateChangeHandler();
  }

  private init() {
    switch (this.currentDateState) {
      case DATE_STATES.MONTH:
        const currentMonth = this.months.find(m => m.number === this.currentDate.getMonth());
        this.headerText = currentMonth.name + ' ' + this.currentDate.getFullYear();
        break;
      case DATE_STATES.WEEK:
        // this.currentDate = moment(this.currentDate).add(1, 'week').toDate();
        const startWeekDate = moment(this.currentDate).startOf('isoWeek').toDate();
        const endWeekDate = moment(this.currentDate).endOf('isoWeek').toDate();
        const startMonth = this.months.find(m => m.number === startWeekDate.getMonth());
        const endMonth = this.months.find(m => m.number === endWeekDate.getMonth());
        if (startMonth === endMonth) {
          this.headerText = startMonth.name + ' ' + this.currentDate.getFullYear();
        } else {
          this.headerText = `${startMonth.name} - ${endMonth.name} ${this.currentDate.getFullYear()}`;
        }
        break;
      default:
        console.log('Unknown date state');
    }
  }

  private dateChangeHandler() {
    this.dateChanged.emit(this.currentDate);
    this.xdCalendarService.setCurrentDate(this.currentDate);
  }
}
