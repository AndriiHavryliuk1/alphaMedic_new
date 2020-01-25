import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import Constants from '../../utils/constants';
import { MatDialogRef} from '@angular/material';
import {AlertService} from '../../services/alert.service';
import {PatientsService} from '../../services/patients/patients.service';
import {Patient} from '../../models/patient';
import CONSTANTS from  '../../utils/constants';

@Component({
  selector: 'app-modify-patient',
  templateUrl: './modify-patient.component.html',
  styleUrls: ['./modify-patient.component.css']
})
export class ModifyPatientComponent implements OnInit {

  public patientForm: FormGroup;
  public TEXT_MAX_LENGTH: number;
  public minDate = new Date('01-01-1900');
  public maxDate = new Date();

  constructor(public dialogRef: MatDialogRef<ModifyPatientComponent>,
              private alertService: AlertService,
              private patientsService: PatientsService) {
    this.TEXT_MAX_LENGTH = Constants.TEXT_MAX_LENGTH;
  }

  public ngOnInit() {
    this.patientForm = new FormGroup({
      name: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH), Validators.required]),
      surname: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH), Validators.required]),
      fatherName: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH)]),
      birthday: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.email]),
      firstPhoneNumber: new FormControl('', [Validators.required]),
      secondPhoneNumber: new FormControl('', [Validators.pattern('[0-9]{0-10}')]),
      region: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH)]),
      city: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH)]),
      address: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH)]),
      workPlace: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH)]),
    });
  }

  @HostListener('window:keyup.esc')
  public onKeyUp() {
    this.closeDialog();
  }

  public getErrorMessage(formControl) {
    return this.alertService.getErrorMessage(formControl);
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public async createPatient() {
    try {
      const patientForCreate = new Patient(this.patientForm.value);
      await this.patientsService.createPatient(patientForCreate);
      this.alertService.showAlert('Користувач доданий', CONSTANTS.ALERT_DURATION.ERROR, CONSTANTS.ALERT_TYPES.ERROR);
      this.closeDialog();
    } catch (error) {
      this.alertService.showAlert(error.errorMessage, CONSTANTS.ALERT_DURATION.ERROR, CONSTANTS.ALERT_TYPES.ERROR);
    }
  }

}
