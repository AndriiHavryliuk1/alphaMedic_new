import {Action} from '@ngrx/store';
import {Patient} from '../../models/patient';

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

export class AddPatient implements Action {
  readonly type = ADD_PATIENT;

  constructor(public payload: Patient) {
  }
}

export class AddPatients implements Action {
  readonly type = ADD_PATIENTS;

  constructor(public payload: Patient[]) {
  }
}


export class LoadPatient implements Action {
  readonly type = LOAD_PATIENT;

  constructor(public payload: { id: number }) {
  }
}

export class LoadPatientSuccess implements Action {
  readonly type = LOAD_PATIENT_SUCCESS;

  constructor(public payload: Patient) {
  }
}

export class LoadPatientError implements Action {
  readonly type = LOAD_PATIENT_ERROR;
}

export class LoadPatients implements Action {
  readonly type = LOAD_PATIENTS;

  constructor() {
  }
}

export class LoadPatientsSuccess implements Action {
  readonly type = LOAD_PATIENTS_SUCCESS;

  constructor(public payload: Patient[]) {
  }
}

export class CreatePatientStart implements Action {
  readonly type = CREATE_PATIENT_START;

  constructor(public payload: Patient) {
  }
}

export class CreatePatientError implements Action {
  readonly type = CREATE_PATIENT_ERROR;

  constructor(public payload) {
  }
}

export class CreatePatientSuccess implements Action {
  readonly type = CREATE_PATIENT_SUCCESS;

  constructor(public payload: Patient) {
  }
}

export class LoadPatientsError implements Action {
  readonly type = LOAD_PATIENTS_ERROR;
  constructor(public payload) {
  }
}

export type PatientsActions = AddPatient
  | AddPatients
  | LoadPatients
  | LoadPatientsSuccess
  | LoadPatientsError
  | LoadPatient
  | LoadPatientSuccess
  | LoadPatientError
  | CreatePatientStart
  | CreatePatientSuccess
  | CreatePatientError;
