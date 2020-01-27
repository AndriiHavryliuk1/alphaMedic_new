import {Injectable} from '@angular/core';
import {Constants} from '../../utils/constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, take} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {User} from '../../models/user';

interface IUserSettings {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getUserSettings() {
    return new Promise((resolve) => {
      this.http.get<IUserSettings>(Constants.SERVER_URL + '/userSettings', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        })
      }).pipe(take(1), catchError(error => {
        return throwError(resolve(error));
      })).subscribe((userSettings: IUserSettings) => {
        this.authService.user.next(new User(userSettings.user, userSettings.token));
        resolve(userSettings);
      });
    });
  }
}

export function appInitializerFactory(appInitializerService: AppInitializerService) {
  return () => appInitializerService.getUserSettings();
}
