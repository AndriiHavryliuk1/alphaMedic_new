import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Constants} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisResource {

  constructor(private http: HttpClient) { }

  getDiagnosis() {
    return this.http.get(Constants.SERVER_URL + '/diagnosis');
  }


}
