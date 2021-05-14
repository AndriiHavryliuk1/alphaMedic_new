import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../app.model';
import {getPatients} from './patients.reducer';
import {PatientsState} from './patients.model';

const selectPatientsFeature = createFeatureSelector<AppState, PatientsState>("patients");
export const selectPatients = createSelector(selectPatientsFeature, getPatients);

export const selectPatientById = (patientId) => createSelector(selectPatients, (patients) => {
  return patients.find(p => p.id === patientId) || null;
});
