import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {DATE_STATES} from './xd-calendar.utils';
import {XdCalendarService} from './xd-calendar.service';

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
  private dateStateSub;
  private currentDateSub;
  private createNewEventClickedSub;

  constructor(private xdCalendarService: XdCalendarService) {
  }

  ngOnInit(): void {
    this.init();
    this.dateStateSub = this.xdCalendarService.dateState.subscribe(newState => {
      this.dateState = newState;
    });
    this.currentDateSub = this.xdCalendarService.currentDate.subscribe(newDate => {
      this.currentDate = newDate;
    });
    this.createNewEventClickedSub = this.xdCalendarService.createNewEventClicked.subscribe((day) => {
      this.createNewEventClicked.next(day);
    });
  }

  ngOnDestroy(): void {
    this.dateStateSub.unsubscribe();
    this.currentDateSub.unsubscribe();
    this.createNewEventClickedSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.events && !changes.events.firstChange) {
      this.events = changes.events.currentValue;
      this.init();
    }
  }

  private init() {
    if (this.currentDate) {
      this.xdCalendarService.currentDate.next(this.currentDate);
    }
    if (this.dateState) {
      this.xdCalendarService.dateState.next(this.dateState);
    }
    if (this.dateState) {
      this.xdCalendarService.events.next(this.dateState);
    }
  }

}
