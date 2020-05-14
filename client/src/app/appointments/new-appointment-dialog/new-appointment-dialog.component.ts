import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';
import {AuthService} from '../../services/auth/auth.service';
import {AppointmentsService} from '../../services/appointments/appointments.service';
import {Constants} from '../../utils/constants';
import {AlertService} from '../../services/alert.service';
import {getDurationFromTime} from '../../utils/utils';

@Component({
  selector: 'app-new-appointment-dialog',
  templateUrl: './new-appointment-dialog.component.html',
  styleUrls: ['./new-appointment-dialog.component.scss']
})
export class NewAppointmentDialogComponent implements OnInit {

  public visitForm;
  public selectedDiagnosis;
  public selectedPatient;

  constructor(public dialogRef: MatDialogRef<NewAppointmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private alertService: AlertService,
              private authService: AuthService,
              private appointmentsService: AppointmentsService) {

    this.selectedPatient = {
      id: data.selectedPatient.id,
      text: data.selectedPatient.fullName
    };

  }

  ngOnInit() {
    this.visitForm = new FormGroup({
      doctorText: new FormControl(''),
      visitDate: new FormControl(null, [Validators.required]),
      visitTime: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required])
    });

    this.selectedDiagnosis = null;
  }

  @HostListener('window:keyup.esc')
  public onKeyUp() {
    this.closeDialog();
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  async createVisit() {
    if (!this.visitForm.valid) {
      return;
    }
    debugger;

    const visitStartDate = moment(this.visitForm.get('visitDate').value.toDate().toDateString())
      .add(getDurationFromTime(this.visitForm.get('visitTime').value), 'seconds').toDate();
    const duration = getDurationFromTime(this.visitForm.get('duration').value);

    const dataForSave = {
      dateStart: visitStartDate,
      duration, // sec
      dateEnd: moment(visitStartDate).add(duration, 'seconds').toDate(),
      doctor: {
        _id: this.authService.user.value.getId(),
        fullName: this.authService.user.value.getFullName()
      },
      patient: {
        _id: this.selectedPatient.id,
        fullName: this.selectedPatient.text
      },
      provisionalDiagnosis: this.selectedDiagnosis ? [this.selectedDiagnosis] : []
    };

    try {
      await this.appointmentsService.createAppointment(dataForSave);
      this.closeDialog();
    } catch (e) {
      this.alertService.showAlert(e.error.message, Constants.ALERT_DURATION.ERROR, Constants.ALERT_TYPES.ERROR);
    }

  }


}
