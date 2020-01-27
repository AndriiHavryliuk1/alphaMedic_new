import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Constants} from '../../utils/constants';
import {IUserSettings} from './user-settings.service';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsResource {

  constructor(private http: HttpClient) { }

  getUserSettings() {
    return this.http.get<IUserSettings>(Constants.SERVER_URL + '/userSettings', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }

}
