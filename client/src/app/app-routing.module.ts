import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {AuthGuard} from './guards/auth.guard';
import {AppointmentComponent} from './appointments/appointment/appointment.component';

const routes: Routes = [
  {path: 'patients', loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule)},
  {path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard]},
  {path: 'sign-to-appointment', component: AppointmentComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: LoginComponent},
  {path: 'sign-up', component: RegistrationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
