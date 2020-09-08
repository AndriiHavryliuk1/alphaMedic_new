import {Actions, Effect, ofType} from '@ngrx/effects';
import * as PatientsActions from './patients.action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PatientsService} from '../../services/patients/patients.service';
import {of} from 'rxjs';
import {Patient} from '../../models/patient';
import {
  CreatePatientError,
  CreatePatientSuccess,
  LoadPatientError,
  LoadPatientsError,
  LoadPatientsSuccess,
  LoadPatientSuccess
} from './patients.action';
import {Injectable} from '@angular/core';

@Injectable()
export class PatientsEffects {
  @Effect()
  loadPatients$ = this.actions$.pipe(
    ofType(PatientsActions.LOAD_PATIENTS),
    mergeMap(() => {
      return this.patientsService.getPatients()
        .pipe(
          map((patients: Patient[]) => new LoadPatientsSuccess(patients)),
          catchError((error) => {
            return of(new LoadPatientsError(error));
          })
        );
    })
  );

  @Effect()
  loadPatient$ = this.actions$.pipe(
    ofType(PatientsActions.LOAD_PATIENT),
    mergeMap((patientData: PatientsActions.LoadPatient) => {
      return this.patientsService.getPatient(patientData.payload.id)
        .pipe(
          map((patient ) => {
            return new LoadPatientSuccess(patient);
          }),
          catchError(() => {
            return of(new LoadPatientError());
          })
        );
    })
  );

  @Effect()
  createPatient$ = this.actions$.pipe(
    ofType(PatientsActions.CREATE_PATIENT_START),
    mergeMap((patientData: PatientsActions.CreatePatientStart) => {
      return this.patientsService.createPatient(patientData.payload)
        .pipe(
          map((patient ) => {
            return new CreatePatientSuccess(patient);
          }),
          catchError((error) => {
            return of(new CreatePatientError(error));
          })
        );
    })
  );

  constructor(private actions$: Actions, private patientsService: PatientsService) {
  }
}
