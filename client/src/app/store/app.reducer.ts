import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromPatients from './patients/patients.reducer';

export interface AppState {
  patients: fromPatients.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  patients: fromPatients.patientsReducer,
};

const selectPatientsFeature = createFeatureSelector<AppState, fromPatients.State>("patients");
export const selectPatients = createSelector(selectPatientsFeature, fromPatients.getPatients);
