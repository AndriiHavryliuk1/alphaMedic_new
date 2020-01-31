import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {PatientsResource} from './patients.resource';
import {Subject, throwError} from 'rxjs';
import {Patient} from '../../models/patient';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  public patientsObserver = new Subject<Patient[]>();
  private cachedPatients = [];

  constructor(private patientResource: PatientsResource) { }

  public getPatients() {
    return new Promise<Patient[]>((resolve, reject) => {
      this.patientResource.getPatients().pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((response: Patient[]) => {
        const patients = response.map(p => new Patient(p));
        this.cachedPatients = patients.map(p => new Patient(p));
        resolve(patients);
      });
    });
  }

  public getPatient(id) {
    return new Promise<Patient>((resolve, reject) => {
      this.patientResource.getPatient(id).pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((response: Patient) => {
        const patient = new Patient(response);
        if (this.cachedPatients.find(pat => pat.id !== patient.id)) {
          this.cachedPatients.push(new Patient(patient));
        }
        resolve(patient);
      });
    });
  }

  public createPatient(patientData) {
    return new Promise<Patient>((resolve, reject) => {
      this.patientResource.createPatient(patientData).pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((response: Patient) => {
        const patient = new Patient(response);
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
