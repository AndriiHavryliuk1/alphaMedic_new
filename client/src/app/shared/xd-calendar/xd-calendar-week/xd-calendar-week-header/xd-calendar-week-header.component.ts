import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as moment from 'moment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-week-header',
  templateUrl: './xd-calendar-week-header.component.html',
  styleUrls: ['./xd-calendar-week-header.component.scss']
})
export class XdCalendarWeekHeaderComponent implements OnInit, OnChanges {
  @Input()
  public days = [
    {position: 0, fullName: 'Понеділок', shortName: 'Пн'},
    {position: 1, fullName: 'Вівторок', shortName: 'Вт'},
    {position: 2, fullName: 'Середа', shortName: 'Ср'},
    {position: 3, fullName: 'Четвер', shortName: 'Чт'},
    {position: 4, fullName: 'П\'ятниця', shortName: 'Пт'},
    {position: 5, fullName: 'Субота', shortName: 'Сб'},
    {position: 6, fullName: 'Неділя', shortName: 'Нд'}
  ] as any;
  @Input()
  public useShort = false;
  @Input()
  public currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
    this.initCurrentWeek();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentDate && !changes.currentDate.firstChange) {
      this.currentDate = changes.currentDate.currentValue;
      this.initCurrentWeek();
    }
  }

  private initCurrentWeek() {
    const today = new Date();
    const isCurrentWeek = moment(this.currentDate).isSame(today, 'week');
    const weekStart = moment(this.currentDate).startOf('isoWeek');
    for (let i = 0; i < 7; i++) {
      const day = moment(weekStart).add(i, 'days').toDate().getDate();
      this.days[i].number = day;
      if (isCurrentWeek && today.getDate() === day) {
        this.days[i].today = true;
      }
    }
  }

}
