import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SvgIconComponent} from './svg-icon/svg-icon.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {HighlightPipe, AutocompleteComponent} from './autocomplete/autocomplete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import {ClickOutDirective} from './clickOut/click-out.directive';
import {MultiValueEditorComponent} from './multi-value-editor/multi-value-editor.component';
import {MatChipsModule} from '@angular/material/chips';
import { XdCalendarComponent } from './xd-calendar/xd-calendar.component';
import { XdCalendarMonthComponent } from './xd-calendar/xd-calendar-month/xd-calendar-month.component';
import { XdCalendarWeekComponent } from './xd-calendar/xd-calendar-week/xd-calendar-week.component';
import { XdCalendarDayComponent } from './xd-calendar/xd-calendar-day/xd-calendar-day.component';
import { XdCalendarYearComponent } from './xd-calendar/xd-calendar-year/xd-calendar-year.component';
import { XdCalendarMonthHeaderComponent } from './xd-calendar/xd-calendar-month/xd-calendar-month-header/xd-calendar-month-header.component';
import { XdCalendarMonthCellComponent } from './xd-calendar/xd-calendar-month/xd-calendar-month-cell/xd-calendar-month-cell.component';
import { XdCalendarHeaderComponent } from './xd-calendar/xd-calendar-header/xd-calendar-header.component';
import {MatButtonModule} from '@angular/material/button';
import { XdCalendarWeekHeaderComponent } from './xd-calendar/xd-calendar-week/xd-calendar-week-header/xd-calendar-week-header.component';

@NgModule({
  declarations: [
    SvgIconComponent,
    AutocompleteComponent,
    HighlightPipe,
    PlaceholderDirective,
    ClickOutDirective,
    MultiValueEditorComponent,
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
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    SvgIconComponent,
    AutocompleteComponent,
    PlaceholderDirective,
    ClickOutDirective,
    MultiValueEditorComponent,
    XdCalendarComponent
  ]
})
export class SharedModule {
}
