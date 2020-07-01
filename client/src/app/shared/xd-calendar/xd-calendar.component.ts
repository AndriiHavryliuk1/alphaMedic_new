import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DATE_STATES} from './xd-calendar.utils';
import {XdCalendarService} from './xd-calendar.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar',
  templateUrl: './xd-calendar.component.html',
  styleUrls: ['./xd-calendar.component.css']
})
export class XdCalendarComponent implements OnInit, OnDestroy {
  @Input() currentDate;
  @Input() dateState;
  @Input() events;
  @Output() eventsChange = new EventEmitter();

  public DATE_STATES = DATE_STATES;
  private dateStateSub;
  private currentDateSub;

  constructor(private xdCalendarService: XdCalendarService) {
  }

  ngOnInit(): void {
    if (this.currentDate) {
      this.xdCalendarService.currentDate.next(this.currentDate);
    }
    if (this.dateState) {
      this.xdCalendarService.dateState.next(this.dateState);
    }

    if (this.dateState) {
      this.xdCalendarService.events.next(this.dateState);
    }

    this.dateStateSub = this.xdCalendarService.dateState.subscribe(newState => {
      this.dateState = newState;
    });

    this.currentDateSub = this.xdCalendarService.currentDate.subscribe(newDate => {
      this.currentDate = newDate;
    });
  }

  ngOnDestroy(): void {
    this.dateStateSub.unsubscribe();
    this.currentDateSub.unsubscribe();
  }

}
