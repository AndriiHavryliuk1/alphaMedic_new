import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Constants} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ServicesResource {

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get(Constants.SERVER_URL + '/services');
  }


}
