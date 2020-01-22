import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import Constants from '../../utils/constants';
import {DateAdapter, MAT_DATE_FORMATS, MatDialogRef} from '@angular/material';
import {AlertService} from '../../services/alert.service';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../utils/format-datapicker';

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

  constructor(public dialogRef: MatDialogRef<ModifyPatientComponent>, private alertService: AlertService) {
    this.TEXT_MAX_LENGTH = Constants.TEXT_MAX_LENGTH;
  }

  ngOnInit() {
    this.patientForm = new FormGroup({
      name: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH), Validators.required]),
      surname: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH), Validators.required]),
      fatherName: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH)]),
      birthday: new FormControl(null),
      email: new FormControl('', [Validators.email]),
      firstPhoneNumber: new FormControl('', [Validators.pattern('[0-9]{0-10}')]),
      secondPhoneNumber: new FormControl('', [Validators.pattern('[0-9]{0-10}')]),
      region: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH)]),
      city: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH)]),
      address: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH)]),
      workPlace: new FormControl('', [Validators.maxLength(Constants.TEXT_MAX_LENGTH)]),
    });
  }

  @HostListener('window:keyup.esc')
  onKeyUp() {
    this.closeDialog();
  }

  getErrorMessage(formControl) {
    return this.alertService.getErrorMessage(formControl);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
