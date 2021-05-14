import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Patient} from '../../models/patient';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {selectPatients} from '../../store/patients/patients.selector';

@Injectable({
  providedIn: 'root'
})
export class PatientsListResolver implements Resolve<Patient> {
  constructor(private store: Store) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.store.select(selectPatients).pipe(take(1));
  }
}
