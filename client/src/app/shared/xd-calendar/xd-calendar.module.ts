import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {XdCalendarComponent} from './xd-calendar.component';
import {XdCalendarMonthComponent} from './xd-calendar-month/xd-calendar-month.component';
import {XdCalendarWeekComponent} from './xd-calendar-week/xd-calendar-week.component';
import {XdCalendarDayComponent} from './xd-calendar-day/xd-calendar-day.component';
import {XdCalendarYearComponent} from './xd-calendar-year/xd-calendar-year.component';
import {XdCalendarMonthHeaderComponent} from './xd-calendar-month/xd-calendar-month-header/xd-calendar-month-header.component';
import {XdCalendarMonthCellComponent} from './xd-calendar-month/xd-calendar-month-cell/xd-calendar-month-cell.component';
import {XdCalendarHeaderComponent} from './xd-calendar-header/xd-calendar-header.component';
import {XdCalendarWeekHeaderComponent} from './xd-calendar-week/xd-calendar-week-header/xd-calendar-week-header.component';
import {MatIconModule} from '@angular/material/icon';
import {XdCalendarService} from './xd-calendar.service';

@NgModule({
  declarations: [

    XdCalendarComponent,
    XdCalendarMonthComponent,
    XdCalendarWeekComponent,
    XdCalendarDayComponent,
    XdCalendarYearComponent,
    XdCalendarMonthHeaderComponent,
    XdCalendarMonthCellComponent,
    XdCalendarHeaderComponent,
    XdCalendarWeekHeaderComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [XdCalendarService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    XdCalendarComponent
  ]
})
export class XdCalendarModule {
}
