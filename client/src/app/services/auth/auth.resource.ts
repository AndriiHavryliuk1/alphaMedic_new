import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import CONSTANTS from '../../utils/constants';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthResource {

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(CONSTANTS.SERVER_URL + '/auth/signup', data);
  }

  login(data: any) {
    return this.http.post<{user: User, token: string}>(CONSTANTS.SERVER_URL + '/auth/login', data);
  }
}
