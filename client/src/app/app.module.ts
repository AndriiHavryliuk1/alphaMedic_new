import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {DoctorsListComponent} from './doctors/doctors-list/doctors-list.component';
import {DoctorsSingleViewComponent} from './doctors/doctors-single-view/doctors-single-view.component';
import {SignToAppointmentComponent} from './appointments/sign-to-appointment/sign-to-appointment.component';
import {AppointmentDetailComponent} from './appointments/appointment-detail/appointment-detail.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {LoginComponent} from './auth/login/login.component';
import {AppointmentsListComponent} from './appointments/appointments-list/appointments-list.component';
import {UserSingleViewComponent} from './user/user-single-view/user-single-view.component';
import {HomeComponent} from './home/home.component';
import {DepartmentsListComponent} from './departments/departments-list/departments-list.component';
import {DepartmentsService} from "./services/departments.service";
import {DoctorsService} from "./services/doctors.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DoctorsListResolver} from "./doctors/doctors-list/doctors-list-resolver.service";
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppointmentComponent,
    DoctorsListComponent,
    DoctorsSingleViewComponent,
    SignToAppointmentComponent,
    AppointmentDetailComponent,
    RegistrationComponent,
    LoginComponent,
    AppointmentsListComponent,
    UserSingleViewComponent,
    HomeComponent,
    DepartmentsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [DepartmentsService, DoctorsService, DoctorsListResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
