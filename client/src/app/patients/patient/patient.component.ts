import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../models/patient';
import * as moment from 'moment';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public patient: Patient;
  public fullFullName: string;
  public formattedBirthday: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const activatedRouteSub = this.activatedRoute.data.subscribe((data) => {
      this.patient = data.patient;
      this.fullFullName = this.patient.fullName + " " + this.patient.fatherName;
      this.formattedBirthday = moment(this.patient.birthday).format("DD-MM-YYYY");
    });
    activatedRouteSub.unsubscribe();
  }

}
