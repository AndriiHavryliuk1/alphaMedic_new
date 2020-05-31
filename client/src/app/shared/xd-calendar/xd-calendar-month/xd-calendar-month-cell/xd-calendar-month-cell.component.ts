import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-month-cell',
  templateUrl: './xd-calendar-month-cell.component.html',
  styleUrls: ['./xd-calendar-month-cell.component.scss']
})
export class XdCalendarMonthCellComponent implements OnInit {
  @Input() day;

  constructor() { }

  ngOnInit(): void {
  }

}
