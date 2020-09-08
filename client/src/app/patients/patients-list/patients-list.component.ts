import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModifyPatientComponent} from '../add-patient/modify-patient.component';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../models/patient';
import {PatientsService} from '../../services/patients/patients.service';
import {Subscription} from 'rxjs';
import {NewAppointmentDialogComponent} from '../../appointments/new-appointment-dialog/new-appointment-dialog.component';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {selectPatients} from '../../store/patients/patients.reducer';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit, OnDestroy {
  public patients: Patient[];
  private subscriptions: Subscription[] = [];

  constructor(private matDialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    const patientsSub = this.store.select(selectPatients).subscribe((patients) => {
      this.patients = patients.slice();
    });
    this.subscriptions = [patientsSub];
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  trackByIndexFn(index, item) {
    return item.id;
  }

}
