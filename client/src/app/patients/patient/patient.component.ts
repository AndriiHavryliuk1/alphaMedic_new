import {Component, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../models/patient';
import * as moment from 'moment';
import {PatientsService} from '../../services/patients/patients.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
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

  constructor(private activatedRoute: ActivatedRoute,
              private patientsService: PatientsService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    const activatedRouteSub = this.activatedRoute.data.subscribe((data) => {
      this.patient = data.patient;
      this.fullFullName = this.patient.fullName + ' ' + this.patient.fatherName;
      this.formattedBirthday = moment(this.patient.birthday).format('DD-MM-YYYY');
      // @ts-ignore
      this.fullYears = Math.floor(moment.duration(moment() - moment(this.patient.birthday)).asYears());
      this.patientsService.loadProfilePhoto(this.patient.id).then(response => {
        this.patient.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64, " + response);
      });
    });
    activatedRouteSub.unsubscribe();
  }

  async onFileChanged(event) {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('profile', selectedFile);
    const response = await this.patientsService.uploadProfilePhoto(this.patient.id, formData);
    this.patient.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64, " + response);
  }

  onUpload() {
    // upload code goes here
  }

}
