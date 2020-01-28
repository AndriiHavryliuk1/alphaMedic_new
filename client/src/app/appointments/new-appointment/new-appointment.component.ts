import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DiagnosisService} from '../../services/diagnosis/diagnosis.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PatientsService} from '../../services/patients/patients.service';

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
              patientsService: PatientsService) {

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
      patientText: new FormControl(''),
      doctorText: new FormControl(''),
      visitData: new FormControl(null),
      visitTime: new FormControl(null),
      duration: new FormControl(null)
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
  }

}
