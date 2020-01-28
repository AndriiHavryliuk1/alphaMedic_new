import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {PatientsResource} from './patients.resource';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {Patient} from '../../models/patient';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  public patientsObserver = new Subject<Patient[]>();
  private cachedPatients;

  constructor(private patientResource: PatientsResource) { }

  public getPatients() {
    return new Promise<Patient[]>((resolve, reject) => {
      this.patientResource.getPatients().pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((patients: Patient[]) => {
        this.cachedPatients = patients;
        resolve(patients);
      });
    });
  }

  public createPatient(patientData) {
    return new Promise<Patient>((resolve, reject) => {
      this.patientResource.createPatient(patientData).pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((patient: Patient) => {
        this.cachedPatients.push(patient);
        this.patientsObserver.next(this.cachedPatients);
        resolve(patient);
      });
    });
  }

  public getCachedPatients() {
    return this.cachedPatients;
  }

}
