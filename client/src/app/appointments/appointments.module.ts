import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
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
    RouterModule,
    MatCardModule
  ],
  providers: [],
  exports: [NewAppointmentComponent, AppointmentComponent],
  entryComponents: [NewAppointmentComponent]
})
export class AppointmentsModule { }
