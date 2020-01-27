import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {UserSettingsResource} from './user-settings.resource';
import {throwError} from 'rxjs';
import {User} from '../../models/user';
import {AuthService} from '../auth/auth.service';

export interface IUserSettings {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private userSettingsResource: UserSettingsResource, private authService: AuthService) {
  }

  public getUserSettings() {
    return new Promise((resolve) => {
      this.userSettingsResource.getUserSettings().pipe(take(1), catchError(error => {
        return throwError(resolve(error));
      })).subscribe((userSettings: IUserSettings) => {
        this.authService.user.next(new User(userSettings.user, userSettings.token));
        resolve(userSettings);
      });
    });
  }
}

