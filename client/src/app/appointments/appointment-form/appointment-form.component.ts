import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DiagnosisService} from '../../services/diagnosis/diagnosis.service';
import {PatientsService} from '../../services/patients/patients.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  @Input() public visitForm;
  @Input() public selectedPatient;
  @Input() public selectedDiagnosis;
  @Input() public patientStatic = false;
  @Output() selectedPatientChange = new EventEmitter();
  @Output() selectedDiagnosisChange = new EventEmitter();

  public diagnosis;
  public patients;
  public patient: FormControl;

  constructor(private diagnosisService: DiagnosisService,
              private patientsService: PatientsService) {
  }

  ngOnInit(): void {
    if (this.selectedPatient) {
      this.patient = new FormControl({value: this.selectedPatient.fullName, disabled: true});
    }

    this.diagnosis = this.diagnosisService.getCachedDiagnosis().map(value => ({
      id: value._id,
      text: value.name
    }));

    this.patients = this.patientsService.getCachedPatients().map(value => ({
      id: value.id,
      text: value.fullName
    }));
  }

  onDiagnosisChanged(value) {
    this.selectedDiagnosis = value;
    this.selectedDiagnosisChange.emit(this.selectedDiagnosis);
  }

  onPatientsChanged(value) {
    this.selectedPatient = value;
    this.selectedPatientChange.emit(this.selectedPatient);
  }

}
