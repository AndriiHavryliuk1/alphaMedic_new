import {ActionReducerMap} from '@ngrx/store';

import {AppState} from './app.model';
import {patientsReducer} from './patients/patients.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  patients: patientsReducer,
};
