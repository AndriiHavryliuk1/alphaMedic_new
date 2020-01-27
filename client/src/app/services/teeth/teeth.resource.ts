import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Constants} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TeethResource {

  constructor(private http: HttpClient) { }

  getTeeth() {
    return this.http.get(Constants.SERVER_URL + '/teeth');
  }


}
