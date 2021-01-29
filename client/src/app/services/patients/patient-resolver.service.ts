import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Patient} from '../../models/patient';
import {Store} from '@ngrx/store';
import {catchError, take} from 'rxjs/operators';
import {selectPatients} from '../../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class PatientResolver implements Resolve<Patient> {
  constructor(private store: Store) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      this.store.select(selectPatients).pipe(take(1), catchError((e) => {
        reject(e);
        return e;
      })).subscribe((patients: Patient[]) => {
        return resolve({...patients.find(p => p.id === route.params.id)});
      });
    });
  }
}
