import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import CONSTANTS from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PatientsResource {

  constructor(private http: HttpClient) { }

  getPatients() {
    return this.http.get(CONSTANTS.SERVER_URL + '/patients');
  }

  createPatient(data) {
    return this.http.post(CONSTANTS.SERVER_URL + '/patients', data);
  }

}
