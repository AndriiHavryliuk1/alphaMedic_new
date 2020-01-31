import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoctorsListComponent} from './doctors/doctors-list/doctors-list.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {DoctorsListResolver} from './services/doctors/doctors-list-resolver.service';
import {UserSingleViewComponent} from './user/user-single-view/user-single-view.component';
import {AuthGuard} from './guards/auth.guard';
import {PatientsListComponent} from './patients/patients-list/patients-list.component';
import {PatientsListResolver} from './services/patients/patients-list-resolver.service';
import {AppointmentComponent} from './appointments/appointment/appointment.component';
import {PatientComponent} from './patients/patient/patient.component';
import {PatientResolver} from './services/patients/patient-resolver.service';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'doctors', resolve: {doctors: DoctorsListResolver}, component: DoctorsListComponent, canActivate: [AuthGuard]},
  {path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard]},
  {path: 'patients', resolve: {patients: PatientsListResolver}, component: PatientsListComponent, canActivate: [AuthGuard]},
  {path: 'patients/:id', resolve: {patient: PatientResolver}, component: PatientComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: LoginComponent},
  {path: 'sign-up', component: RegistrationComponent},
  {path: 'user', component: UserSingleViewComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
