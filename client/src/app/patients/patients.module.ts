import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatRadioModule, MatTabsModule
} from '@angular/material';
import {PatientsListComponent} from './patients-list/patients-list.component';
import {ModifyPatientComponent} from './add-patient/modify-patient.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PatientsService} from '../services/patients/patients.service';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppointmentsModule} from '../appointments/appointments.module';
import {PatientComponent} from './patient/patient.component';
import {QuestionnaireComponent} from './patient/questionnaire/questionnaire.component';
import {PhotoProtocolComponent} from './patient/photo-protocol/photo-protocol.component';
import {PerioStateComponent} from './patient/perio-state/perio-state.component';
import {TeethFormulaComponent} from './patient/teeth-formula/teeth-formula.component';
import {XRayComponent} from './patient/x-ray/x-ray.component';
import {CarePlanComponent} from './patient/care-plan/care-plan.component';
import {DoctorsDairyComponent} from './patient/doctors-dairy/doctors-dairy.component';
import {InlineSVGModule} from 'ng-inline-svg';

@NgModule({
  declarations: [
    PatientsListComponent,
    ModifyPatientComponent,
    PatientComponent,
    QuestionnaireComponent,
    PhotoProtocolComponent,
    PerioStateComponent,
    TeethFormulaComponent,
    XRayComponent,
    CarePlanComponent,
    DoctorsDairyComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    RouterModule,
    MatCardModule,
    MatRadioModule,
    AppointmentsModule,
    MatTabsModule,
    InlineSVGModule
  ],
  providers: [PatientsService],
  exports: [PatientsListComponent, PatientComponent],
  entryComponents: [ModifyPatientComponent]
})
export class PatientsModule {
}
