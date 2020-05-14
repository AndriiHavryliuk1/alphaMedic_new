import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NewAppointmentDialogComponent} from './new-appointment-dialog/new-appointment-dialog.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {SharedModule} from '../shared/shared.module';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {PatientsService} from '../services/patients/patients.service';
import {AppointmentsService} from '../services/appointments/appointments.service';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

@NgModule({
  declarations: [NewAppointmentDialogComponent, AppointmentComponent, AppointmentFormComponent, NewAppointmentComponent],
  imports: [
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
  exports: [NewAppointmentDialogComponent, AppointmentComponent, NewAppointmentComponent]
})
export class AppointmentsModule { }
