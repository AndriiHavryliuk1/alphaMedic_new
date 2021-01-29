import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {User} from '../../models/user';
import {AuthService} from '../auth/auth.service';
import {Constants} from '../../utils/constants';
import {HttpClient} from '@angular/common/http';

export interface IUserSettings {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getUserSettings() {
    return this.http.get<IUserSettings>(Constants.SERVER_URL + '/userSettings').toPromise().then((userSettings: IUserSettings) => {
      this.authService.user.next(new User(userSettings.user, userSettings.token));
      return userSettings;
    }, (error) => {
      return error;
    });
  }
}

