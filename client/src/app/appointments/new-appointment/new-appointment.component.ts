import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {AuthService} from '../../services/auth/auth.service';
import {AppointmentsService} from '../../services/appointments/appointments.service';
import * as moment from 'moment';
import {getDurationFromTime} from '../../utils/utils';
import {Constants} from '../../utils/constants';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent implements OnInit {

  public visitForm;
  public selectedDiagnosis = null;
  public selectedPatient = null;
  public patient: FormControl;

  constructor(private alertService: AlertService,
              private authService: AuthService,
              private appointmentsService: AppointmentsService) {
  }

  ngOnInit() {
    this.visitForm = new FormGroup({
      visitDate: new FormControl(null, [Validators.required]),
      visitTime: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required])
    });

    this.selectedDiagnosis = null;
  }

  async createVisit() {
    if (!(this.visitForm.valid && this.selectedPatient)) {
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
      await this.appointmentsService.createAppointment(dataForSave);
    } catch (e) {
      this.alertService.showAlert(e.error.message, Constants.ALERT_DURATION.ERROR, Constants.ALERT_TYPES.ERROR);
    }

  }

}
