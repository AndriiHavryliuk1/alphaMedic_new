import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import * as moment from 'moment';
import {XdCalendarService} from '../../../core/services/xd-calendar.service';
import {XdCalendarPlaceholderDirective} from '../../xd-calendar-directives/xd-calendar-placeholder.directive';
import {XdCalendarShowMoreComponent} from '../../xd-calendar-components/xd-calendar-show-more/xd-calendar-show-more.component';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ShowMoreDialogComponent} from '../../../shared/show-more-dialog/show-more-dialog.component';
import {EmitEvent, EventBusService, Events} from '../../../core/services/event-bus.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-month-cell',
  templateUrl: './xd-calendar-month-cell.component.html',
  styleUrls: ['./xd-calendar-month-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XdCalendarMonthCellComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() day;
  public moreEventsCount = 0;
  isReady$ = new BehaviorSubject(false);
  eventsToShow$ = new BehaviorSubject([]);

  @ViewChild(XdCalendarPlaceholderDirective) panelHost: XdCalendarPlaceholderDirective;
  private closeSub: Subscription;

  constructor(private xdCalendarService: XdCalendarService,
              private elementRef: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialog: MatDialog,
              private eventBus: EventBusService) {
  }

  ngOnInit(): void {
    this.day.events.forEach((event) => {
      event.shortText = moment(event.dateStart).format('HH:mm') + ' ' + event.name;
    });

    this.day.events.sort((a, b) => a.dateStart - b.dateStart);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.removeExtraEventsDiv());
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onCellClick(event) {
    event.stopPropagation();
    this.eventBus.emit(new EmitEvent(Events.CreateNewEventClicked, this.day));
  }

  onEventClick(clickEvent, event) {
    clickEvent.stopPropagation();
    this.xdCalendarService.goToLink(event.link);
  }

  onShowMoreEventsClick(event) {
    event.stopPropagation();
    this.dialog.open(ShowMoreDialogComponent, {
      data: {
        events: this.day.events.slice(this.day.events.length - this.moreEventsCount),
        date: this.day.date
      }
    });
  }

  showEventDetails(event) {
    event.stopPropagation();
    const editPanelFactory = this.componentFactoryResolver.resolveComponentFactory(XdCalendarShowMoreComponent);
    this.panelHost.viewContainerRef.clear();
    const editPanel = this.panelHost.viewContainerRef.createComponent(editPanelFactory);

    editPanel.instance.events = this.day.events.slice(this.day.events.length - this.moreEventsCount);
    editPanel.instance.date = this.day.date;

    this.closeSub = editPanel.instance.close.subscribe(async () => {
      this.panelHost.viewContainerRef.clear();
      this.closeSub.unsubscribe();
    });
  }

  private removeExtraEventsDiv() {
    const eventsCount = this.day.events.length;
    if (eventsCount) {
      const eventsToShow = [...this.day.events];
      const heightOfContainer = this.elementRef.nativeElement.getBoundingClientRect().height;
      const numberDivHeight = this.elementRef.nativeElement.querySelector('.header')?.getBoundingClientRect().height + 2;
      const freeHeight = heightOfContainer - numberDivHeight; // 2px margin bottom
      const eventDivHeight = 21;
      if (freeHeight < (eventDivHeight * eventsCount)) {
        let eventsToFit = Math.floor(freeHeight / eventDivHeight) - 1;
        eventsToFit = eventsToFit < 0 ? 0 : eventsToFit;
        const startIndex = eventsToFit - 1 < 0 ? 0 : eventsToFit;
        eventsToShow.splice(startIndex, eventsCount - eventsToFit);
        this.moreEventsCount = eventsCount - eventsToFit;
      }
      this.eventsToShow$.next(eventsToShow);
      this.isReady$.next(true);
    }
  }

}
