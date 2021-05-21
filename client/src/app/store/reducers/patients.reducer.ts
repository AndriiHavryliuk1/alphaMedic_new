import {createReducer, on} from '@ngrx/store';
import {PatientsActions} from '../actions/patients.action';
import {PatientsState} from '../models/patients.model';

const INITIAL_STATE = {
  patients: [],
  createPatientError: null,
  loadPatientsError: null
};

export const patientsReducer = createReducer(
  INITIAL_STATE,
  on(PatientsActions.addPatient,
    PatientsActions.createPatientSuccess, (state, action) => ({
      ...state,
      loadPatientsError: null,
      createPatientError: null,
      patients: [...state.patients, action.patient]
    })
  ),
  on(PatientsActions.addPatients,
    PatientsActions.loadPatientsSuccess, (state, action) => {
      return {
        ...state,
        loadPatientsError: null,
        createPatientError: null,
        patients: [...state.patients, ...action.patients]
      };
    }
  ),
  on(PatientsActions.loadPatientSuccess, (state, action) => {
      const index = state.patients.findIndex(p => action.patient.id === p.id);
      const patients = [...state.patients];
      if (index === -1) {
        patients.push(action.patient);
      } else {
        patients[index] = {...action.patient};
      }
      return {
        loadPatientsError: null,
        createPatientError: null,
        patients,
        ...state
      };
    }
  ),
  on(PatientsActions.loadPatientsError, (state, action) => ({
      ...state,
      createPatientError: null,
      loadPatientsError: action.error
    })
  ),
  on(PatientsActions.createPatientError, (state, action) => ({
      ...state,
      loadPatientsError: null,
      createPatientError: action.error
    })
  ),
);

export const getPatients = (state: PatientsState) => state.patients;

