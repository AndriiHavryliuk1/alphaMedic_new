import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import * as moment from 'moment';
import {XdCalendarService} from '../../xd-calendar.service';
import {XdCalendarPlaceholderDirective} from '../../xd-calendar-directives/xd-calendar-placeholder.directive';
import {XdCalendarShowMoreComponent} from '../../xd-calendar-components/xd-calendar-show-more/xd-calendar-show-more.component';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-month-cell',
  templateUrl: './xd-calendar-month-cell.component.html',
  styleUrls: ['./xd-calendar-month-cell.component.scss']
})
export class XdCalendarMonthCellComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() day;
  public moreEventsCount = 0;

  @ViewChild(XdCalendarPlaceholderDirective) panelHost: XdCalendarPlaceholderDirective;
  private closeSub: Subscription;

  constructor(private xdCalendarService: XdCalendarService,
              private elementRef: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.day.events.forEach((event) => {
      event.shortText = moment(event.dateStart).format('HH:mm') + ' ' + event.name;
    });

    this.day.events.sort((a, b) => {
      return a.dateStart - b.dateStart;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.removeExtraEventsDiv();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onCellClick(event) {
    event.stopPropagation();
    this.xdCalendarService.createNewEventClicked.next(this.day);
  }

  onEventClick(clickEvent, event) {
    clickEvent.stopPropagation();
    this.xdCalendarService.goToLink(event.link);
  }

  onShowMoreEventsClick(event) {
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
    const eventDivs = this.elementRef.nativeElement.querySelectorAll('.event');
    if (eventDivs.length) {
      const heightOfContainer = this.elementRef.nativeElement.getBoundingClientRect().height;
      const numberDivHeight = eventDivs[0].offsetTop - this.elementRef.nativeElement.offsetTop;
      const freeHeight = heightOfContainer - numberDivHeight; // 2px margin bottom
      const eventDivHeight = eventDivs[0].getBoundingClientRect().height + 2;
      if (freeHeight < (eventDivHeight * eventDivs.length)) {
        let eventsToFit = Math.floor(freeHeight / eventDivHeight) - 1;
        eventsToFit = eventsToFit < 0 ? 0 : eventsToFit;
        this.moreEventsCount = eventDivs.length - eventsToFit;
        this.cdRef.detectChanges();
        for (let i = eventsToFit; i < eventDivs.length && eventsToFit >= 0; i++) {
          eventDivs[i].remove();
        }
      }
    }
  }

}
