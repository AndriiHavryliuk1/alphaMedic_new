import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppointmentsService} from './appointments.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsResolver implements Resolve<any> {
  constructor(private appointmentsService: AppointmentsService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.appointmentsService.getAppointments();
  }
}
