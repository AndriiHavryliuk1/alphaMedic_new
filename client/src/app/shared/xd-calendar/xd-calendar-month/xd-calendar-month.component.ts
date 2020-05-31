import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import {getDayOfWeekStartedFromMonday} from '../../../utils/utils';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-month',
  templateUrl: './xd-calendar-month.component.html',
  styleUrls: ['./xd-calendar-month.component.scss']
})
export class XdCalendarMonthComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() public currentDate = new Date();
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
    const startDayOfMonth = getDayOfWeekStartedFromMonday(moment(this.currentDate).startOf('month').day());
    const daysInCurrentMonth = moment(this.currentDate).daysInMonth();
    const daysInPreviousMonth = moment(this.currentDate).subtract(1, 'months').daysInMonth();
    const isCurrentMonth = moment(this.currentDate).isSame(new Date(), 'month');
    const currentDay = new Date().getDate();
    this.monthMatrix = [];

    let addedDays = 0;
    let currentDayAdded = false;
    for (let week = 0; week < 5; ++week) {
      this.monthMatrix.push([]);
      for (let day = 0; day < 7; ++day) {
        if (week === 0 && day < startDayOfMonth) {
          this.monthMatrix[week].push({
            number: daysInPreviousMonth - startDayOfMonth + 1 + day
          });
        } else {
          this.monthMatrix[week].push({
            number: ++addedDays
          });
          if (isCurrentMonth && !currentDayAdded && currentDay === addedDays) {
            this.monthMatrix[week][day].today = true;
            currentDayAdded = true;
          }
          if (addedDays === daysInCurrentMonth) {
            addedDays = 0;
          }
        }
      }
    }
  }

}
