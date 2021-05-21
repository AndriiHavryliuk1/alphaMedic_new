import {ActionReducerMap} from '@ngrx/store';

import {AppState} from './app.model';
import {patientsReducer} from './reducers/patients.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  patients: patientsReducer,
};
