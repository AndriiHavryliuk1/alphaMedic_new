import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {AuthGuard} from './guards/auth.guard';
import {PatientsListComponent} from './patients/patients-list/patients-list.component';
import {PatientsListResolver} from './services/patients/patients-list-resolver.service';
import {AppointmentComponent} from './appointments/appointment/appointment.component';
import {PatientComponent} from './patients/patient/patient.component';
import {PatientResolver} from './services/patients/patient-resolver.service';
import {QuestionnaireComponent} from './patients/patient/questionnaire/questionnaire.component';
import {PhotoProtocolComponent} from './patients/patient/photo-protocol/photo-protocol.component';
import {PerioStateComponent} from './patients/patient/perio-state/perio-state.component';
import {TeethFormulaComponent} from './patients/patient/teeth-formula/teeth-formula.component';
import {XRayComponent} from './patients/patient/x-ray/x-ray.component';
import {DoctorsDairyComponent} from './patients/patient/doctors-dairy/doctors-dairy.component';
import {CarePlanComponent} from './patients/patient/care-plan/care-plan.component';

const routes: Routes = [
  {path: '', redirectTo: 'patients', pathMatch: 'full'},
  {path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard]},
  {path: 'sign-to-appointment', component: AppointmentComponent, canActivate: [AuthGuard]},
  {path: 'patients', resolve: {patients: PatientsListResolver}, component: PatientsListComponent, canActivate: [AuthGuard]},
  {
    path: 'patients/:id', resolve: {patient: PatientResolver}, component: PatientComponent, canActivate: [AuthGuard], children: [
      {path: 'questionnaire', component: QuestionnaireComponent},
      {path: 'photo-protocol', component: PhotoProtocolComponent},
      {path: 'perio-state', component: PerioStateComponent},
      {path: 'teeth-formula', component: TeethFormulaComponent},
      {path: '', redirectTo: 'teeth-formula', pathMatch: 'full'},
      {path: 'x-ray', component: XRayComponent},
      {path: 'care-plan', component: CarePlanComponent},
      {path: 'doctors-dairy', component: DoctorsDairyComponent}
    ]
  },
  {path: 'sign-in', component: LoginComponent},
  {path: 'sign-up', component: RegistrationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
