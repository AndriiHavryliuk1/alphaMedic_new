import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Constants} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PatientsResource {

  constructor(private http: HttpClient) { }

  getPatients() {
    return this.http.get(Constants.SERVER_URL + '/patients');
  }

  getPatient(id) {
    return this.http.get(Constants.SERVER_URL + '/patients/' + id);
  }

  createPatient(data) {
    return this.http.post(Constants.SERVER_URL + '/patients', data);
  }

  uploadProfilePhoto(id, data) {
    // const options = { headers: new HttpHeaders({
    //     'Content-Type': 'multipart/form-data',
    //     'Content-Disposition': `form-data; name="profile"; filename="${data.name}"`
    //   })};
    return this.http.post(Constants.SERVER_URL + `/patients/${id}/profile-photo`, data, {responseType: 'text'});
  }

  loadProfilePhoto(id) {
    return this.http.get(Constants.SERVER_URL + `/patients/${id}/profile-photo`, {responseType: 'text'});
  }

}
