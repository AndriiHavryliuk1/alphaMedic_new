import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {DoctorsService} from "../../services/doctors.service";
import {Doctor} from "../doctor.model";
import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorsListResolver implements Resolve<Doctor> {
  constructor(private doctorsService: DoctorsService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.doctorsService.getDoctors());
        }, 1000)
      })
  }
}
