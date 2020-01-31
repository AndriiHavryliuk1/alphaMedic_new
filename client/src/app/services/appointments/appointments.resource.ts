import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Constants} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsResource {

  constructor(private http: HttpClient) { }

  getAppointments() {
    return this.http.get(Constants.SERVER_URL + '/appointments');
  }

  postAppointments(data) {
    return this.http.post(Constants.SERVER_URL + '/appointments', data);
  }


}
