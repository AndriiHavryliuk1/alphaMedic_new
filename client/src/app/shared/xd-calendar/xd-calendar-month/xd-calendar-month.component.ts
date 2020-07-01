import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import {getDayOfWeekStartedFromMonday} from '../xd-calendar.utils';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-month',
  templateUrl: './xd-calendar-month.component.html',
  styleUrls: ['./xd-calendar-month.component.scss']
})
export class XdCalendarMonthComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() public currentDate = new Date();
  @Input() public events = [];
  public monthMatrix = [];

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.initMonthMatrix();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const monthContentDiv = document.getElementById('month-content');
      this.renderer.setStyle(monthContentDiv, 'height', `calc(100vh - ${monthContentDiv.offsetTop}px)`);
      //   this.renderer.setStyle(monthContentDiv.firstChild, 'height', `calc(100vh - ${monthContentDiv.offsetTop}px)`);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentDate && !changes.currentDate.firstChange) {
      this.currentDate = changes.currentDate.currentValue;
      this.initMonthMatrix();
    }
  }

  private initMonthMatrix() {
    debugger;
    const startDayOfMonth = getDayOfWeekStartedFromMonday(moment(this.currentDate).startOf('month').day());
    const daysInCurrentMonth = moment(this.currentDate).daysInMonth();
    const daysInPreviousMonth = moment(this.currentDate).subtract(1, 'months').daysInMonth();
    const isCurrentMonth = moment(this.currentDate).isSame(new Date(), 'month');
    const currentDay = new Date().getDate();
    this.monthMatrix = [];

    const currentMonthEvents = this.getFilteredEventsFormDate(this.events, this.currentDate, 'month');

    const previousMonth = moment(this.currentDate).subtract(1, 'months');
    const previousMonthEvents = this.getFilteredEventsFormDate(this.events, previousMonth, 'month');
    const nextMonth = moment(this.currentDate).add(1, 'months');
    const nextMonthEvents = this.getFilteredEventsFormDate(this.events, nextMonth, 'month');


    let addedDays = 0;
    let currentDayAdded = false;
    let currentMonthAdded = false;
    for (let week = 0; week < 5; ++week) {
      this.monthMatrix.push([]);
      for (let day = 0; day < 7; ++day) {
        if (week === 0 && day < startDayOfMonth) {
          const dayNumber = daysInPreviousMonth - startDayOfMonth + 1 + day;
          this.monthMatrix[week].push({
            number: dayNumber,
            events: this.getFilteredEventsFormDate(previousMonthEvents, dayNumber, 'day')

          });
        } else {
          this.monthMatrix[week].push({
            number: ++addedDays
          });
          if (isCurrentMonth && !currentDayAdded && currentDay === addedDays) {
            this.monthMatrix[week][day].today = true;
            currentDayAdded = true;
          }
          this.monthMatrix[week][day].events = !currentMonthAdded
            ? this.getFilteredEventsFormDate(currentMonthEvents, addedDays, 'day')
            : this.getFilteredEventsFormDate(nextMonthEvents, addedDays, 'day');

          if (addedDays === daysInCurrentMonth) {
            addedDays = 0;
            currentMonthAdded = true;
          }
        }
      }
    }
  }


  private getFilteredEventsFormDate(events, date, type) {
    return events.filter((event) => {
      return this.checkDateInCurrentRange(event, date, type);
    });
  }


  private checkDateInCurrentRange(event, date, type) {
    let isDateStartInRange;
    let isDateEndInRange;
    if (type === 'month') {
      isDateStartInRange = moment(event.dateStart).isSame(date, 'month');
      isDateEndInRange = moment(event.dateEnd).isSame(date, 'month');
    } else if (type === 'day') {
      isDateStartInRange = new Date(event.dateStart).getDate() === date;
      isDateEndInRange = new Date(event.dateEnd).getDate() === date;
    }
    return isDateStartInRange || isDateEndInRange;
  }


}
