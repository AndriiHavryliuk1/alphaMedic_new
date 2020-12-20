import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {AppointmentsComponent} from './appointments/appointments.component';
import {AppointmentComponent} from './appointment/appointment.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id', component: AppointmentComponent, canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {
}
