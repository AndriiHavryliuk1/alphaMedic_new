import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
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
import {EditPanelComponent} from './patient/teeth-formula/edit-panel/edit-panel.component';
import {EditPanelOptionsComponent} from './patient/teeth-formula/edit-panel-options/edit-panel-options.component';
import {SharedModule} from '../shared/shared.module';
import {ClickOutsideModule} from 'ng-click-outside';

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
    DoctorsDairyComponent,
    EditPanelComponent,
    EditPanelOptionsComponent],
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
    InlineSVGModule,
    SharedModule,
    ClickOutsideModule
  ],
  providers: [PatientsService]
})
export class PatientsModule {
}
