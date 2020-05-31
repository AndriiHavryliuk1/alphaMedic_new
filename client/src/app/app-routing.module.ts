import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {AuthGuard} from './guards/auth.guard';
import {AppointmentComponent} from './appointments/appointment/appointment.component';
import {NewAppointmentComponent} from './appointments/new-appointment/new-appointment.component';
import {PatientsListResolver} from './services/patients/patients-list-resolver.service';

const routes: Routes = [
  {path: 'start-page', loadChildren: () => import('./start-page/start-page.module').then(m => m.StartPageModule)},
  {path: 'patients', loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule)},
  {path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard]},
  {path: 'sign-to-appointment', resolve: {patients: PatientsListResolver}, component: NewAppointmentComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: LoginComponent},
  {path: 'sign-up', component: RegistrationComponent},
  {path: '',   redirectTo: '/start-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
