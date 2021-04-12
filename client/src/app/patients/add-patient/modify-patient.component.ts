import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../services/alert.service';
import {Patient} from '../../models/patient';
import {Constants} from '../../utils/constants';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {skip, take} from 'rxjs/operators';
import {selectPatients} from '../../store/app.reducer';
import {PatientsActions} from '../../store/patients/patients.action';

@Component({
  selector: 'app-modify-patient',
  templateUrl: './modify-patient.component.html',
  styleUrls: ['./modify-patient.component.scss']
})
export class ModifyPatientComponent implements OnInit {

  public patientForm: FormGroup;
  public TEXT_MAX_LENGTH: number;
  public minDate = new Date('01-01-1900');
  public maxDate = new Date();
  public genderValues = Constants.GENDER;

  constructor(public dialogRef: MatDialogRef<ModifyPatientComponent>,
              private alertService: AlertService,
              private store: Store<fromApp.AppState>) {
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
      gender: new FormControl(Constants.GENDER.MALE)
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
    const patient = new Patient(this.patientForm.value);
    this.store.dispatch(PatientsActions.createPatient({patient}));
    this.store.select(selectPatients).pipe(skip(1), take(1)).subscribe((data) => {
      // @ts-ignore
      const error = data.createPatientError;
      if (error) {
        this.alertService.showAlert(error.errorMessage || error.message, Constants.ALERT_DURATION.ERROR, Constants.ALERT_TYPES.ERROR);
        return;
      }
      this.alertService.showAlert('Користувач доданий', Constants.ALERT_DURATION.ERROR, Constants.ALERT_TYPES.ERROR);
      this.closeDialog();
    });
  }

}
