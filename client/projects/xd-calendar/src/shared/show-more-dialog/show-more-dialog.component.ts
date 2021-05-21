import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {XdCalendarService} from '../../core/services/xd-calendar.service';
import {getDayOfWeekStartedFromMonday} from '../../lib/xd-calendar.utils';

@Component({
  selector: 'lib-show-more-dialog',
  templateUrl: './show-more-dialog.component.html',
  styleUrls: ['./show-more-dialog.component.scss']
})
export class ShowMoreDialogComponent implements OnInit {

  events;
  date: Date;
  public currentDay;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<ShowMoreDialogComponent>,
              private xdCalendarService: XdCalendarService) {
    this.events = this.data.events;
    this.date = this.data.date;
  }

  ngOnInit(): void {
    this.currentDay = this.xdCalendarService.days[getDayOfWeekStartedFromMonday(this.date.getDay())];
  }

  onClickEvent(event) {
    this.dialogRef.close();
    this.xdCalendarService.goToLink(event.link);
  }

}
