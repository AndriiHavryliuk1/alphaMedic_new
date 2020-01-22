import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {PatientsListComponent} from './patients-list/patients-list.component';
import { ModifyPatientComponent } from './add-patient/modify-patient.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PatientsListComponent, ModifyPatientComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  exports: [PatientsListComponent],
  entryComponents: [ModifyPatientComponent]
})
export class PatientsModule { }
