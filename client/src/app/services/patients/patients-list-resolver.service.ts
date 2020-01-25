import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {PatientsService} from './patients.service';
import {Patient} from '../../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsListResolver implements Resolve<Patient> {
  constructor(private patientsService: PatientsService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.patientsService.getPatients();
  }
}
