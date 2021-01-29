import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DiagnosisService} from '../../services/diagnosis/diagnosis.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {selectPatients} from '../../store/app.reducer';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit, OnDestroy {

  @Input() public visitForm;
  @Input() public selectedPatient;
  @Input() public selectedDiagnosis;
  @Input() public patientStatic = false;
  @Output() selectedPatientChange = new EventEmitter();
  @Output() selectedDiagnosisChange = new EventEmitter();

  public diagnosis;
  public patients;
  public patient: FormControl;
  private subscriptions: Subscription[] = [];

  constructor(private diagnosisService: DiagnosisService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    if (this.selectedPatient) {
      this.patient = new FormControl({value: this.selectedPatient.fullName, disabled: true});
    }

    this.diagnosis = this.diagnosisService.getCachedDiagnosis().map(value => ({
      id: value.id,
      text: value.name
    }));

    this.subscriptions.push(this.store.select(selectPatients).subscribe(patients => {
      this.patients = patients.map((value) => ({
        id: value.id,
        text: value.fullName
      }));
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
