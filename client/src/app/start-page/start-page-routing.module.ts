import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './start-page.component';
import {AuthGuard} from '../guards/auth.guard';
import {CalendarComponent} from './calendar/calendar.component';
import {AppointmentsComponent} from './appointments/appointments.component';


const routes: Routes = [
  {
    path: '',
    // resolve: {patient: PatientResolver},
    component: StartPageComponent, canActivate: [AuthGuard], children: [
      {path: 'calendar', component: CalendarComponent},
      {path: 'appointments', component: AppointmentsComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartPageRoutingModule {
}
