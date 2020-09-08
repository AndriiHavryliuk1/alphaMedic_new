import { ActionReducerMap } from '@ngrx/store';

import * as patientsReducer from './patients/patients.reducer';

export interface AppState {
  patients: patientsReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  patients: patientsReducer.patientsReducer,
};
