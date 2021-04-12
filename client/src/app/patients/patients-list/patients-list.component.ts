import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModifyPatientComponent} from '../add-patient/modify-patient.component';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../models/patient';
import {Observable} from 'rxjs';
import {NewAppointmentDialogComponent} from '../../appointments/new-appointment-dialog/new-appointment-dialog.component';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {selectPatients} from '../../store/app.reducer';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {
  public $patients = new Observable<Patient[]>();

  constructor(private matDialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.$patients = this.store.select(selectPatients);
  }

  addNewPatient() {
    this.matDialog.open(ModifyPatientComponent, {disableClose: true});
  }

  addToVisit(currentPatient) {
    this.matDialog.open(NewAppointmentDialogComponent, {
      data: {
        selectedPatient: currentPatient
      },
      disableClose: true,
      autoFocus: false
    });
  }

}
