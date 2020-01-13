import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoctorsListComponent} from './doctors/doctors-list/doctors-list.component';
import {HomeComponent} from './home/home.component';
import {SignToAppointmentComponent} from './appointments/sign-to-appointment/sign-to-appointment.component';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {DoctorsListResolver} from './services/doctors/doctors-list-resolver.service';
import {UserSingleViewComponent} from './user/user-single-view/user-single-view.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'doctors', resolve: {doctors: DoctorsListResolver}, component: DoctorsListComponent},
  {path: 'sign-to-appointment', component: SignToAppointmentComponent},
  {path: 'sign-in', component: LoginComponent},
  {path: 'sign-up', component: RegistrationComponent},
  {path: 'user', component: UserSingleViewComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
