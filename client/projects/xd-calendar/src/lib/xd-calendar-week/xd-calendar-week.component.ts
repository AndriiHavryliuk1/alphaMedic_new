import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import {getFilteredEventsFormDate} from '../xd-calendar.utils';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-week',
  templateUrl: './xd-calendar-week.component.html',
  styleUrls: ['./xd-calendar-week.component.scss']
})
export class XdCalendarWeekComponent implements OnInit, OnChanges {
  @Input() currentDate = new Date();
  @Input() events = [];

  public days = [
    {position: 0, fullName: 'Понеділок', shortName: 'Пн'},
    {position: 1, fullName: 'Вівторок', shortName: 'Вт'},
    {position: 2, fullName: 'Середа', shortName: 'Ср'},
    {position: 3, fullName: 'Четвер', shortName: 'Чт'},
    {position: 4, fullName: 'П\'ятниця', shortName: 'Пт'},
    {position: 5, fullName: 'Субота', shortName: 'Сб'},
    {position: 6, fullName: 'Неділя', shortName: 'Нд'}
  ] as any;

  public week = [];

  public hours = [
    {position: 0, text: '00.00', isHoursLabel: true},
    {position: 1, text: '01.00', isHoursLabel: true},
    {position: 2, text: '02.00', isHoursLabel: true},
    {position: 3, text: '03.00', isHoursLabel: true},
    {position: 4, text: '04.00', isHoursLabel: true},
    {position: 5, text: '05.00', isHoursLabel: true},
    {position: 6, text: '06.00', isHoursLabel: true},
    {position: 7, text: '07.00', isHoursLabel: true},
    {position: 8, text: '08.00', isHoursLabel: true},
    {position: 9, text: '09.00', isHoursLabel: true},
    {position: 10, text: '10.00', isHoursLabel: true},
    {position: 11, text: '11.00', isHoursLabel: true},
    {position: 12, text: '12.00', isHoursLabel: true},
    {position: 13, text: '13.00', isHoursLabel: true},
    {position: 14, text: '14.00', isHoursLabel: true},
    {position: 15, text: '15.00', isHoursLabel: true},
    {position: 16, text: '16.00', isHoursLabel: true},
    {position: 17, text: '17.00', isHoursLabel: true},
    {position: 18, text: '18.00', isHoursLabel: true},
    {position: 19, text: '19.00', isHoursLabel: true},
    {position: 20, text: '20.00', isHoursLabel: true},
    {position: 21, text: '21.00', isHoursLabel: true},
    {position: 22, text: '22.00', isHoursLabel: true},
    {position: 23, text: '23.00', isHoursLabel: true}
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.initCurrentWeek();
    // this.week = [this.hours, ...this.week];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentDate && !changes.currentDate.firstChange) {
      this.currentDate = changes.currentDate.currentValue;
      this.initCurrentWeek();
    }
  }

  private initCurrentWeek() {
    this.week = [];
    this.initDays();
    for (let day = 0; day < 7; day++) {
      const today = this.days[day].today ? {
        style: {
          top: (this.currentDate.getHours() * 3600 + this.currentDate.getMinutes() * 60 + this.currentDate.getSeconds()) * 0.0222 + 'px'
        }
      } : null;
      this.week.push({
        events: getFilteredEventsFormDate(this.events, this.currentDate, 'week'),
        today,
        cells: new Array(24)
      });
    }
  }

  private initDays() {
    const today = new Date();
    const isCurrentWeek = moment(this.currentDate).isSame(today, 'week');
    const weekStart = moment(this.currentDate).startOf('isoWeek');
    for (let i = 0; i < 7; i++) {
      const day = moment(weekStart).add(i, 'days').toDate().getDate();
      this.days[i].number = day;
      this.days[i].today = isCurrentWeek && today.getDate() === day;
    }
  }

  private calculateCurrentLinePosition() {

  }

}
