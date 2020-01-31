import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatRadioModule
} from '@angular/material';
import {PatientsListComponent} from './patients-list/patients-list.component';
import { ModifyPatientComponent } from './add-patient/modify-patient.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PatientsService} from '../services/patients/patients.service';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppointmentsModule} from '../appointments/appointments.module';
import { PatientComponent } from './patient/patient.component';

@NgModule({
  declarations: [PatientsListComponent, ModifyPatientComponent, PatientComponent],
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
    MatCardModule,
    MatRadioModule,
    AppointmentsModule
  ],
  providers: [PatientsService],
  exports: [PatientsListComponent, PatientComponent],
  entryComponents: [ModifyPatientComponent]
})
export class PatientsModule { }
