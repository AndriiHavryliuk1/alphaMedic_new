import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PatientsService} from '../../services/patients/patients.service';
import {of} from 'rxjs';
import {Patient} from '../../models/patient';
import {Injectable} from '@angular/core';
import {PatientsActions} from '../actions/patients.action';

@Injectable()
export class PatientsEffects {
  @Effect()
  loadPatients$ = this.actions$.pipe(
    ofType(PatientsActions.loadPatients),
    mergeMap(() => {
      return this.patientsService.getPatients()
        .pipe(
          map((patients: Patient[]) => PatientsActions.loadPatientsSuccess({patients})),
          catchError((error) => {
            return of(PatientsActions.loadPatientsError(error));
          })
        );
    })
  );

  @Effect()
  loadPatient$ = this.actions$.pipe(
    ofType(PatientsActions.loadPatient),
    mergeMap((patientData) => {
      return this.patientsService.getPatient(patientData.id)
        .pipe(
          map((patient) => {
            return PatientsActions.loadPatientSuccess({patient});
          }),
          catchError(() => {
            return of(PatientsActions.loadPatientError);
          })
        );
    })
  );

  @Effect()
  createPatient$ = this.actions$.pipe(
    ofType(PatientsActions.createPatient),
    mergeMap((patientData) => {
      return this.patientsService.createPatient(patientData.patient)
        .pipe(
          map((patient) => {
            return PatientsActions.createPatientSuccess({patient});
          }),
          catchError((error) => {
            return of(PatientsActions.createPatientError(error));
          })
        );
    })
  );

  constructor(private actions$: Actions, private patientsService: PatientsService) {
  }
}
