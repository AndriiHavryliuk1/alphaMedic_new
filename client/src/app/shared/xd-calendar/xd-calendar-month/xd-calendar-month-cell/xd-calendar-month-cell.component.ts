import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {XdCalendarService} from '../../xd-calendar.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-month-cell',
  templateUrl: './xd-calendar-month-cell.component.html',
  styleUrls: ['./xd-calendar-month-cell.component.scss']
})
export class XdCalendarMonthCellComponent implements OnInit, AfterViewInit {
  @Input() day;
  public showMoreNumber = 0;

  constructor(private xdCalendarService: XdCalendarService,
              private elementRef: ElementRef,
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

  onCellClick(event) {
    event.stopPropagation();
    this.xdCalendarService.createNewEventClicked.next(this.day);
  }

  onEventClick(event) {
    event.stopPropagation();
    console.log('onEventClick');
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
        this.showMoreNumber = eventDivs.length - eventsToFit;
        this.cdRef.detectChanges();
        for (let i = eventsToFit; i < eventDivs.length && eventsToFit >= 0; i++) {
          eventDivs[i].remove();
        }
      }
    }
  }

}
