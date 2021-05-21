import {BehaviorSubject, Subject} from 'rxjs';
import {DATE_STATES} from '../../lib/xd-calendar.utils';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class XdCalendarService {

  constructor(private router: Router) {
  }

  public currentDate = new Date();
  public dateState = DATE_STATES.MONTH;
  public events = [];
  public createNewEventClicked = new Subject();
  public days = [
    {position: 0, fullName: 'Понеділок', shortName: 'Пн'},
    {position: 1, fullName: 'Вівторок', shortName: 'Вт'},
    {position: 2, fullName: 'Середа', shortName: 'Ср'},
    {position: 3, fullName: 'Четвер', shortName: 'Чт'},
    {position: 4, fullName: 'П\'ятниця', shortName: 'Пт'},
    {position: 5, fullName: 'Субота', shortName: 'Сб'},
    {position: 6, fullName: 'Неділя', shortName: 'Нд'}
  ];

  private dateStateSubject$ = new BehaviorSubject(this.dateState);
  private currentDateSubject$ = new BehaviorSubject<Date>(this.currentDate);
  private eventsSubject$ = new BehaviorSubject(this.events);
  dateStateChanged$ = this.dateStateSubject$.asObservable();
  currentDateChanged$ = this.currentDateSubject$.asObservable();
  eventsChanged$ = this.eventsSubject$.asObservable();

  public goToLink(link: string) {
    this.router.navigateByUrl(link);
  }

  setEvents(events) {
    this.events = events;
    this.eventsSubject$.next(this.events);
  }

  setDateState(dateState) {
    this.dateState = dateState;
    this.dateStateSubject$.next(this.dateState);
  }

  setCurrentDate(currentDate) {
    this.currentDate = currentDate;
    this.currentDateSubject$.next(this.currentDate);
  }
}
