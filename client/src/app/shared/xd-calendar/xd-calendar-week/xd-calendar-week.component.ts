import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'xd-calendar-week',
  templateUrl: './xd-calendar-week.component.html',
  styleUrls: ['./xd-calendar-week.component.scss']
})
export class XdCalendarWeekComponent implements OnInit, OnChanges {
  @Input() currentDate = new Date();
  @Input() events = [];

  public week = [];

  public hours = [
    {position: 0, text: '00.00', isHoursLabel: true},
    {position: 1, text: '01.00', isHoursLabel: true},
    {position: 2, text: '02.00', isHoursLabel: true},
    {position: 3, text: '03.00', isHoursLabel: true},
    {position: 4, text: '04.00', isHoursLabel: true},
    {position: 5, text: '05.00', isHoursLabel: true},
    {position: 6, text: '06.00', isHoursLabel: true},
    {position: 7, text: '07.00', isHoursLabel: true},
    {position: 8, text: '08.00', isHoursLabel: true},
    {position: 9, text: '09.00', isHoursLabel: true},
    {position: 10, text: '10.00', isHoursLabel: true},
    {position: 11, text: '11.00', isHoursLabel: true},
    {position: 12, text: '12.00', isHoursLabel: true},
    {position: 13, text: '13.00', isHoursLabel: true},
    {position: 14, text: '14.00', isHoursLabel: true},
    {position: 15, text: '15.00', isHoursLabel: true},
    {position: 16, text: '16.00', isHoursLabel: true},
    {position: 17, text: '17.00', isHoursLabel: true},
    {position: 18, text: '18.00', isHoursLabel: true},
    {position: 19, text: '19.00', isHoursLabel: true},
    {position: 20, text: '20.00', isHoursLabel: true},
    {position: 21, text: '21.00', isHoursLabel: true},
    {position: 22, text: '22.00', isHoursLabel: true},
    {position: 23, text: '23.00', isHoursLabel: true}
  ];

  constructor() {
  }

  ngOnInit(): void {
    for (let day = 0; day < 7; day++) {
      const hours = [];
      for (let hour = 0; hour < 24; hour++) {
        hours.push({
          cell: {
            position: {
              x: day,
              y: hour
            },
            eventStart: new Date(),
            eventEnd: new Date()
          },
          hours: {
            from: hour,
            to: hour + 1
          }
        });
      }
      this.week.push(hours);
    }

   // this.week = [this.hours, ...this.week];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentDate && !changes.currentDate.firstChange) {
      this.currentDate = changes.currentDate.currentValue;
    }
  }

}
