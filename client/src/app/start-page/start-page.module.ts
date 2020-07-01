import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartPageComponent} from './start-page.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AppointmentsComponent} from './appointments/appointments.component';
import {StartPageRoutingModule} from './start-page-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {CalendarCommonModule, CalendarDayModule, CalendarMonthModule, CalendarWeekModule} from 'angular-calendar';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {XdCalendarModule} from '../shared/xd-calendar/xd-calendar.module';

@NgModule({
  declarations: [
    StartPageComponent,
    CalendarComponent,
    AppointmentsComponent
  ],
    imports: [
        CommonModule,
        StartPageRoutingModule,
        MatCardModule,
        MatTabsModule,
        CalendarMonthModule,
        CalendarCommonModule,
        CalendarWeekModule,
        CalendarDayModule,
        FormsModule,
        SharedModule,
        XdCalendarModule
    ],
  exports: [
    StartPageComponent,
    CalendarComponent,
    AppointmentsComponent
  ]
})
export class StartPageModule {
}
