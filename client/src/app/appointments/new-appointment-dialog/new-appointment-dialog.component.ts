import {Component, HostListener, Inject, NgZone, OnInit} from '@angular/core';
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
  public patientStatic = false;

  constructor(public dialogRef: MatDialogRef<NewAppointmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private alertService: AlertService,
              private authService: AuthService,
              private appointmentsService: AppointmentsService,
              private ngZone: NgZone) {

    this.visitForm = new FormGroup({
      doctorText: new FormControl(''),
      visitDate: new FormControl(null, [Validators.required]),
      visitTime: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required])
    });

    if (data.selectedPatient) {
      this.selectedPatient = {
        id: data.selectedPatient.id,
        text: data.selectedPatient.fullName
      };
      this.patientStatic = true;
    } else if (data.selectedDate) {
      this.visitForm.get('visitDate').value = data.selectedDate;
    }

  }

  ngOnInit() {

    this.selectedDiagnosis = null;
  }

  @HostListener('window:keyup.esc')
  public onKeyUp() {
    this.closeDialog();
  }

  public closeDialog(data?) {
    this.dialogRef.close(data);
  }

  async createVisit() {
    if (!this.visitForm.valid || !this.selectedPatient) {
      return;
    }

    const visitdateStart = moment(this.visitForm.get('visitDate').value.toDateString())
      .add(getDurationFromTime(this.visitForm.get('visitTime').value), 'seconds').toDate();
    const duration = getDurationFromTime(this.visitForm.get('duration').value);

    const dataForSave = {
      dateStart: visitdateStart,
      duration, // sec
      dateEnd: moment(visitdateStart).add(duration, 'seconds').toDate(),
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
      const newAppointment = await this.appointmentsService.createAppointment(dataForSave);
      this.ngZone.run(() => {
        this.closeDialog(newAppointment);
      });
    } catch (e) {
      this.alertService.showAlert(e.error.message, Constants.ALERT_DURATION.ERROR, Constants.ALERT_TYPES.ERROR);
    }

  }


}
