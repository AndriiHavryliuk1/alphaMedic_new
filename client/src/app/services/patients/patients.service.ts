import {Injectable} from '@angular/core';
import {catchError, map, take, tap} from 'rxjs/operators';
import {PatientsResource} from './patients.resource';
import {Observable, Subject, throwError} from 'rxjs';
import {Patient} from '../../models/patient';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  public patientsObserver = new Subject<Patient[]>();
  private cachedPatients = [];

  constructor(private patientResource: PatientsResource) {

  }

  public getPatients(): Observable<Patient[]> {
    return this.patientResource.getPatients().pipe(map((patients) => patients.map(p => new Patient(p))));
  }

  public getPatient(id) {
    return this.patientResource.getPatient(id).pipe(map(p => new Patient(p)));
  }

  public createPatient(patientData) {
    return this.patientResource.createPatient(patientData).pipe(map(p => new Patient(p)));
  }

  public uploadProfilePhoto(id, data) {
    return new Promise((resolve, reject) => {
      this.patientResource.uploadProfilePhoto(id, data).pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((response) => {
        resolve(response);
      });
    });
  }

  public loadProfilePhoto(id) {
    return new Promise((resolve, reject) => {
      this.patientResource.loadProfilePhoto(id).pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((response) => {
        resolve(response);
      });
    });
  }

  public getCachedPatients() {
    return this.cachedPatients;
  }

}
