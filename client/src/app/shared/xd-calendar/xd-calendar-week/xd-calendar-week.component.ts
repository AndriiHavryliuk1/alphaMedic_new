import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-week',
  templateUrl: './xd-calendar-week.component.html',
  styleUrls: ['./xd-calendar-week.component.css']
})
export class XdCalendarWeekComponent implements OnInit {
  @Input() currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
