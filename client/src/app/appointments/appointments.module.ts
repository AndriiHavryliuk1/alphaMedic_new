import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NewAppointmentComponent} from './new-appointment/new-appointment.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {SharedModule} from '../shared/shared.module';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {PatientsService} from '../services/patients/patients.service';
import {AppointmentsService} from '../services/appointments/appointments.service';

@NgModule({
  declarations: [NewAppointmentComponent, AppointmentComponent],
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
    MatMomentDateModule,
    RouterModule,
    MatCardModule,
    SharedModule,
    NgxMaterialTimepickerModule.setLocale('uk-UA')
  ],
  providers: [
    PatientsService,
    AppointmentsService,
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true, useValue: 'uk-UA' }}
  ],
  exports: [NewAppointmentComponent, AppointmentComponent],
  entryComponents: [NewAppointmentComponent]
})
export class AppointmentsModule { }
