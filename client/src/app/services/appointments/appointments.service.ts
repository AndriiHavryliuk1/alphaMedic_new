import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../utils/constants';

@Injectable()
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  public getAppointments() {
    return this.http.get(Constants.SERVER_URL + '/appointments').toPromise();
  }

  public getAppointment(id) {
    return this.http.get(Constants.SERVER_URL + '/appointments' + id).toPromise();
  }

  public createAppointment(data) {
    return this.http.post(Constants.SERVER_URL + '/appointments', data).toPromise();
  }

}
