import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {DATE_STATES} from './xd-calendar.utils';
import {XdCalendarService} from '../core/services/xd-calendar.service';
import {Subscription} from 'rxjs';
import {EventBusService, Events} from '../core/services/event-bus.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar',
  templateUrl: './xd-calendar.component.html',
  styleUrls: ['./xd-calendar.component.scss']
})
export class XdCalendarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() currentDate;
  @Input() dateState;
  @Input() events;
  @Output() createNewEventClicked = new EventEmitter();

  public DATE_STATES = DATE_STATES;
  private subs = new Subscription();

  constructor(private xdCalendarService: XdCalendarService, private eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this.init();
    this.subs.add(this.xdCalendarService.dateStateChanged$.subscribe(newState => {
      this.dateState = newState;
    }));
    this.subs.add(this.xdCalendarService.currentDateChanged$.subscribe(newDate => {
      this.currentDate = newDate;
    }));
    this.subs.add(this.eventBus.on(Events.CreateNewEventClicked, (day) => {
      this.createNewEventClicked.next(day);
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.events && !changes.events.firstChange) {
      this.events = changes.events.currentValue;
      this.init();
    }
  }

  private init() {
    if (this.currentDate) {
      this.xdCalendarService.setCurrentDate(this.currentDate);
    }
    if (this.dateState) {
      this.xdCalendarService.setDateState(this.dateState);
    }
    if (this.dateState) {
      this.xdCalendarService.setEvents(this.dateState);
    }
  }

}
