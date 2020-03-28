import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Constants} from '../../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TeethFormulaResource {

  constructor(private http: HttpClient) { }

  getTeethFormula() {
    return this.http.get(Constants.SERVER_URL + '/teethFormula');
  }

  updateTeethFormula(data) {
    return this.http.put(Constants.SERVER_URL + '/teethFormula', data);
  }

  updateTooth(teethId, data) {
    return this.http.put(Constants.SERVER_URL + '/teethFormula/' + teethId, data);
  }

}
