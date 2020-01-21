import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {PatientsListComponent} from './patients-list/patients-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';

@NgModule({
  declarations: [PatientsListComponent, AddPatientComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [PatientsListComponent]
})
export class PatientsModule { }
