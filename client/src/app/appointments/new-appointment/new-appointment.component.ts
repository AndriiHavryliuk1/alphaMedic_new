import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DiagnosisService} from '../../services/diagnosis/diagnosis.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PatientsService} from '../../services/patients/patients.service';
import * as moment from 'moment';
import {UserSettingsService} from '../../services/user-settings/user-settings.service';
import {AuthService} from '../../services/auth/auth.service';
import {AppointmentsService} from '../../services/appointments/appointments.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {

  public visitForm;
  public diagnosis;
  public patients;
  public selectedDiagnosis;
  public selectedPatient;
  public patient: FormControl;

  constructor(public dialogRef: MatDialogRef<NewAppointmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              diagnosisService: DiagnosisService,
              patientsService: PatientsService,
              private authService: AuthService,
              private appointmentsService: AppointmentsService) {

    this.selectedPatient = data.selectedPatient;
    if (this.selectedPatient) {
      this.patient = new FormControl({value: this.selectedPatient.fullName, disabled: true});
    }
    this.diagnosis = diagnosisService.getCachedDiagnosis().map(value => ({
      id: value._id,
      text: value.name
    }));

    this.patients = patientsService.getCachedPatients().map(value => ({
      id: value._id,
      text: value.fullName
    }));
  }

  ngOnInit() {
    this.visitForm = new FormGroup({
      patientText: new FormControl(this.selectedPatient ? this.selectedPatient.fullName : '', [Validators.required]),
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

  onDiagnosisChanged(value) {
    this.selectedDiagnosis = value;
    console.log(this.visitForm.get('visitDate').value.toDate());
  }

  async createVisit() {
    if (!this.visitForm.valid) {
      return;
    }

    const visitStartDate = moment(this.visitForm.get('visitDate').value.toDate().toDateString()).add(this.getDurationFromTime(this.visitForm.get('visitTime').value), 'seconds').toDate();
    const duration = this.getDurationFromTime(this.visitForm.get('duration').value);
    console.log('duration: ' + duration);
    console.log('visitStartDate: ' + visitStartDate);

    const dataForSave = {
      dateStart: visitStartDate,
      duration, // sec
      dateEnd: moment(visitStartDate).add(duration, "seconds").toDate(),
      doctor: {
        _id: this.authService.user.value.getId(),
        fullName: this.authService.user.value.getFullName()
      },
      patient: {
        _id: this.selectedPatient.id,
        fullName: this.selectedPatient.fullName
      }
    };

    try {
      const appointment = await this.appointmentsService.createAppointment(dataForSave);
      console.log(appointment);
    } catch (e) {
      console.log(e);
    }

  }

  /**
   * Return duration in sec
   */
  private getDurationFromTime(timeValue: string): number {
    const separatedDuration = timeValue.split(':');
    return +separatedDuration[0] * 3600 + +separatedDuration[1] * 60;
  }



}
