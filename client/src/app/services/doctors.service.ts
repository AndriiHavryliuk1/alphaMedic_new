import {Injectable, EventEmitter} from '@angular/core';
import {Doctor} from "../doctors/doctor.model";

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  doctorsListChanged = new EventEmitter();

  doctors = [
    new Doctor(1, "Jnon", "Jason", "email@org.com", "qwerty", {}, new Date),
    new Doctor(2, "Kail", "Laky", "email2@org.com", "qwerty", {}, new Date),
    new Doctor(3, "Jan", "Bany", "email1@org.com", "qwerty", {}, new Date),
    new Doctor(4, "Anie", "Anyson", "email54@org.com", "qwerty", {}, new Date)
  ];

  constructor() { }

  public getDoctors() {
    return this.doctors.slice();
  }

  public addDoctor(newDoctor) {
    this.doctors.push(newDoctor);
    this.doctorsListChanged.emit(this.doctors)
  }
}
