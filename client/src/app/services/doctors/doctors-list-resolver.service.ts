import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {DoctorsService} from './doctors.service';
import {Doctor} from '../../doctors/doctor.model';
import {Injectable, EventEmitter} from '@angular/core';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorsListResolver implements Resolve<Doctor> {
  constructor(private doctorsService: DoctorsService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
      return new Promise((resolve, reject) => {
        this.doctorsService.getDoctors().pipe(catchError((error) => {
          return throwError(reject(error));
        })).subscribe((data) => {
          resolve(data);
        });
      });
  }
}
