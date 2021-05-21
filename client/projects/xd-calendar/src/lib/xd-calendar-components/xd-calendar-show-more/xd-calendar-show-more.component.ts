import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {XdCalendarService} from '../../../core/services/xd-calendar.service';
import {getDayOfWeekStartedFromMonday} from '../../xd-calendar.utils';

@Component({
  selector: 'app-xd-calendar-show-more',
  templateUrl: './xd-calendar-show-more.component.html',
  styleUrls: ['./xd-calendar-show-more.component.scss']
})
export class XdCalendarShowMoreComponent implements OnInit, AfterViewInit {

  @Input() events;
  @Input() date: Date;
  @Output() public close = new EventEmitter();
  public currentDay;

  constructor(private elementRef: ElementRef, private xdCalendarService: XdCalendarService) {
  }

  ngOnInit(): void {
    this.currentDay = this.xdCalendarService.days[getDayOfWeekStartedFromMonday(this.date.getDay())];


  }

  ngAfterViewInit(): void {
    this.openPanel.bind(this);
  }

  onClickEvent(event) {
    this.xdCalendarService.goToLink(event.link);
  }


  closePanel() {
    this.close.emit(null);
  }

  private openPanel() {
    const panelDiv = this.elementRef.nativeElement.firstChild;
    const panelBounding = panelDiv.getBoundingClientRect();
    const heightWithPanel = panelBounding.height + panelBounding.top;
    if (window.innerHeight < heightWithPanel) {
      panelDiv.style.top = panelBounding.top - (heightWithPanel - window.innerHeight) + 'px';
    }
    panelDiv.style.width = panelBounding.width + 'px';
    panelDiv.style.position = 'absolute';
  }

}
