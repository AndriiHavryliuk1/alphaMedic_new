import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatRadioModule,
  MatNativeDateModule, MatSnackBarModule
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
import {DepartmentsService} from './services/departments.service';
import {DoctorsService} from './services/doctors/doctors.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DoctorsListResolver} from './services/doctors/doctors-list-resolver.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {AuthService} from './services/auth/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './services/auth/auth-interceptor.service';
import {appInitializerFactory, AppInitializerService} from './services/app/app-initializer.service';
import {SharedModule} from './shared/shared.module';
import {PatientsModule} from './patients/patients.module';

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
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatRadioModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    SharedModule,
    PatientsModule
  ],
  providers: [
    DepartmentsService,
    DoctorsService,
    DoctorsListResolver,
    AuthService,
    AppInitializerService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }, {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AppInitializerService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
