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
  public fullYears: number;
  public navLinks = [{
    path: 'questionnaire',
    label: 'Анкета'
  }, {
    path: 'photo-protocol',
    label: 'Фото протокол'
  }, {
    path: 'perio-state',
    label: 'Стан пародонтозу'
  }, {
    path: 'teeth-formula',
    label: 'Зубна формула'
  }, {
    path: 'x-ray',
    label: 'Рентген'
  }, {
    path: 'care-plan',
    label: 'План лікування'
  }, {
    path: 'doctors-dairy',
    label: 'Щоденник лікаря'
  }];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const activatedRouteSub = this.activatedRoute.data.subscribe((data) => {
      this.patient = data.patient;
      this.fullFullName = this.patient.fullName + ' ' + this.patient.fatherName;
      this.formattedBirthday = moment(this.patient.birthday).format('DD-MM-YYYY');
      // @ts-ignore
      this.fullYears = Math.floor(moment.duration(moment() - moment(this.patient.birthday)).asYears());
    });
    activatedRouteSub.unsubscribe();
  }

}
