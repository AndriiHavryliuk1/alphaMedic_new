import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-week',
  templateUrl: './xd-calendar-week.component.html',
  styleUrls: ['./xd-calendar-week.component.scss']
})
export class XdCalendarWeekComponent implements OnInit {
  @Input() currentDate = new Date();

  public hours = [
    {position: 0, text: "00.00"},
    {position: 0, text: "01.00"},
    {position: 0, text: "02.00"},
    {position: 0, text: "03.00"},
    {position: 0, text: "04.00"},
    {position: 0, text: "05.00"},
    {position: 0, text: "06.00"},
    {position: 0, text: "07.00"},
    {position: 0, text: "08.00"},
    {position: 0, text: "09.00"},
    {position: 0, text: "10.00"},
    {position: 0, text: "11.00"},
    {position: 0, text: "12.00"},
    {position: 0, text: "13.00"},
    {position: 0, text: "14.00"},
    {position: 0, text: "15.00"},
    {position: 0, text: "16.00"},
    {position: 0, text: "17.00"},
    {position: 0, text: "18.00"},
    {position: 0, text: "19.00"},
    {position: 0, text: "20.00"},
    {position: 0, text: "21.00"},
    {position: 0, text: "22.00"},
    {position: 0, text: "23.00"}
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
