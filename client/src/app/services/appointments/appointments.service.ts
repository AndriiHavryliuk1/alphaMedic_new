import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {AppointmentsResource} from './appointments.resource';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private cachedAppointments = [];

  constructor(private appointmentsResource: AppointmentsResource) { }

  public getAppointments() {
    return new Promise((resolve, reject) => {
      this.appointmentsResource.getAppointments().pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((appointments: any) => {
        this.cachedAppointments = appointments;
        resolve(appointments);
      });
    });
  }

  public createAppointment(data) {
    return new Promise((resolve, reject) => {
      this.appointmentsResource.postAppointments(data).pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((appointment: any) => {
        this.cachedAppointments.push(appointment);
        resolve(appointment);
      });
    });
  }

  public getCachedAppointments() {
    return this.cachedAppointments;
  }

}
