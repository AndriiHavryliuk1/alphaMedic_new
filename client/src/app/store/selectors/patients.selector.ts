import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../app.model';
import {getPatients} from '../reducers/patients.reducer';
import {PatientsState} from '../models/patients.model';

const selectPatientsFeature = createFeatureSelector<AppState, PatientsState>("patients");
export const selectPatients = createSelector(selectPatientsFeature, getPatients);

export const selectPatientById = (patientId) => createSelector(selectPatients, (patients) => {
  return patients.find(p => p.id === patientId) || null;
});
