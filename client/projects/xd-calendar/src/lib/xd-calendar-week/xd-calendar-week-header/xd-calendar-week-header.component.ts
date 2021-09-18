import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as moment from 'moment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-week-header',
  templateUrl: './xd-calendar-week-header.component.html',
  styleUrls: ['./xd-calendar-week-header.component.scss']
})
export class XdCalendarWeekHeaderComponent implements OnChanges {
  @Input()
  public days;
  @Input()
  public useShort = false;
  @Input()
  public currentDate = new Date();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentDate && !changes.currentDate.firstChange) {
      this.currentDate = changes.currentDate.currentValue;
    }
  }

}
