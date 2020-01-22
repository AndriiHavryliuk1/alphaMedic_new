import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {PatientsResource} from './patients.resource';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private patients;

  constructor(private patientResource: PatientsResource) { }

  public getPatients() {
    return new Promise((resolve, reject) => {
      this.patientResource.getPatients().pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe(patients => {
        this.patients = patients;
        resolve(patients);
      });
    });
  }

  public createPatient(patientData) {
    return new Promise((resolve, reject) => {
      this.patientResource.createPatient(patientData).pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe(patient => {
        this.patients.push(patient);
        resolve(patient);
      });
    });
  }

}
