import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Constants} from '../../utils/constants';
import {Doctor} from '../../doctors/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsResource {

  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get<Doctor[]>(Constants.SERVER_URL + '/doctors');
  }

}
