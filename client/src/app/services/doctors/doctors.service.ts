import {Injectable, EventEmitter} from '@angular/core';
import {Doctor} from '../../doctors/doctor.model';
import {take, tap} from 'rxjs/operators';
import {DoctorsResource} from './doctors.resource';
import {catchError} from 'rxjs/internal/operators';
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  doctorsListChanged = new EventEmitter();

  doctors: Doctor[];

  constructor(private doctorsResource: DoctorsResource) { }

  public getDoctors() {
    return this.doctorsResource.getDoctors().pipe(take(1), tap(data => {
        this.doctors = data as Doctor[];
      }));
  }

  public getDoctor(id: number): Doctor {
    return this.doctors.find((doctor) => id === doctor.id);
  }

  public addDoctor(newDoctor) {
    this.doctors.push(newDoctor);
    this.doctorsListChanged.emit(this.doctors)
  }
}
