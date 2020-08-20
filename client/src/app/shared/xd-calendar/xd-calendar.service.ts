import {BehaviorSubject, Subject} from 'rxjs';
import {DATE_STATES} from './xd-calendar.utils';

export class XdCalendarService {
  public currentDate = new BehaviorSubject<Date>(new Date());
  public dateState = new BehaviorSubject(DATE_STATES.MONTH);
  public events = new BehaviorSubject(null);
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
}
