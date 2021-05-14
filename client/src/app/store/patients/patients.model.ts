import {Patient} from '../../models/patient';

export interface PatientsState {
  patients: Patient[];
  createPatientError: any;
  loadPatientsError: any;
}
