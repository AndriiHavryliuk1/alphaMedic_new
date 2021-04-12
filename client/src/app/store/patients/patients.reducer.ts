import {Patient} from '../../models/patient';
import {createReducer, on} from '@ngrx/store';
import {PatientsActions} from './patients.action';

const INITIAL_STATE = {
  patients: [],
  createPatientError: null,
  loadPatientsError: null
};

export interface State {
  patients: Patient[];
  createPatientError: any;
  loadPatientsError: any;
}

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
      if (index === -1) {
        state.patients.push({...action.patient});
      } else {
        state.patients[index] = {...action.patient};
      }
      return {
        loadPatientsError: null,
        createPatientError: null,
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

export const getPatients = (state: State) => state.patients;

