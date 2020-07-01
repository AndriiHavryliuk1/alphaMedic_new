import {BehaviorSubject} from 'rxjs';
import {DATE_STATES} from './xd-calendar.utils';

export class XdCalendarService {
  public currentDate = new BehaviorSubject<Date>(new Date());
  public dateState = new BehaviorSubject(DATE_STATES.MONTH);
  public events = new BehaviorSubject(null);

  constructor() {

  }
}
