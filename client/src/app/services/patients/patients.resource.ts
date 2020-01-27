import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Constants} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PatientsResource {

  constructor(private http: HttpClient) { }

  getPatients() {
    return this.http.get(Constants.SERVER_URL + '/patients');
  }

  createPatient(data) {
    return this.http.post(Constants.SERVER_URL + '/patients', data);
  }

}
