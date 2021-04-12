import {createAction, props} from '@ngrx/store';
import {Patient} from '../../models/patient';
import {HttpErrorResponse} from '@angular/common/http';

export const LOAD_PATIENTS = 'LOAD_PATIENTS';
export const LOAD_PATIENT = 'LOAD_PATIENT';
export const LOAD_PATIENTS_SUCCESS = 'LOAD_PATIENTS_SUCCESS';
export const LOAD_PATIENT_SUCCESS = 'LOAD_PATIENT_SUCCESS';
export const LOAD_PATIENTS_ERROR = 'LOAD_PATIENTS_ERROR';
export const LOAD_PATIENT_ERROR = 'LOAD_PATIENT_ERROR';
export const ADD_PATIENT = 'ADD_PATIENT';
export const ADD_PATIENTS = 'ADD_PATIENTS';
export const CREATE_PATIENT_START = 'CREATE_PATIENT_START';
export const CREATE_PATIENT_SUCCESS = 'CREATE_PATIENT_SUCCESS';
export const CREATE_PATIENT_ERROR = 'CREATE_PATIENT_ERROR';

const addPatient = createAction(ADD_PATIENT, props<{patient: Patient}>());
const addPatients = createAction(ADD_PATIENTS, props<{patients: Patient[]}>());
const loadPatient = createAction(LOAD_PATIENT, props<{id: number}>());
const loadPatientSuccess = createAction(LOAD_PATIENT_SUCCESS, props<{patient: Patient}>());
const loadPatientError = createAction(LOAD_PATIENT_ERROR);
const loadPatients = createAction(LOAD_PATIENTS);
const loadPatientsSuccess = createAction(LOAD_PATIENTS_SUCCESS, props<{patients: Patient[]}>());
const createPatient = createAction(CREATE_PATIENT_START, props<{patient: Patient}>());
const createPatientError = createAction(CREATE_PATIENT_ERROR, props<{error: HttpErrorResponse}>());
const createPatientSuccess = createAction(CREATE_PATIENT_SUCCESS, props<{patient: Patient}>());
const loadPatientsError = createAction(LOAD_PATIENTS_ERROR, props<{error: HttpErrorResponse}>());

export const PatientsActions = {
  addPatient,
  addPatients,
  loadPatient,
  createPatientSuccess,
  loadPatientError,
  loadPatients,
  loadPatientsSuccess,
  createPatient,
  createPatientError,
  loadPatientSuccess,
  loadPatientsError
};
