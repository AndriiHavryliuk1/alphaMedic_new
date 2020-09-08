import * as PatientsActions from './patients.action';
import {Patient} from '../../models/patient';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../app.reducer';

const initialState = {
  patients: [],
  createPatientError: null,
  loadPatientsError: null
};

export interface State {
  patients: Patient[];
  createPatientError: any;
  loadPatientsError: any;
}

export function patientsReducer(state = initialState, action: PatientsActions.PatientsActions) {
  switch (action.type) {
    case PatientsActions.ADD_PATIENT:
    case PatientsActions.CREATE_PATIENT_SUCCESS:
      return {
        ...state,
        loadPatientsError: null,
        createPatientError: null,
        patients: [...state.patients, action.payload]
      };
    case PatientsActions.ADD_PATIENTS:
    case PatientsActions.LOAD_PATIENTS_SUCCESS:
      return {
        ...state,
        loadPatientsError: null,
        createPatientError: null,
        patients: [...state.patients, ...action.payload]
      };
    case PatientsActions.LOAD_PATIENT_SUCCESS:
      const index = state.patients.findIndex(p => action.payload.id === p.id);
      if (index === -1) {
        state.patients.push({...action.payload});
      } else {
        state.patients[index] = {...action.payload};
      }
      return {
        loadPatientsError: null,
        createPatientError: null,
        ...state
      };
    case PatientsActions.LOAD_PATIENTS_ERROR:
      return {
        ...state,
        createPatientError: null,
        loadPatientsError: action.payload
      };
    case PatientsActions.CREATE_PATIENT_ERROR:
      return {
        ...state,
        loadPatientsError: null,
        createPatientError: action.payload
      };
    default:
      return state;
  }
}

const selectPatientsFeature = createFeatureSelector<AppState, State>("patients");

export const selectPatients = createSelector(
  selectPatientsFeature,
  (state: State) => state.patients
);

