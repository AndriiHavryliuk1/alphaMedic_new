import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModifyPatientComponent} from '../add-patient/modify-patient.component';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../models/patient';
import {PatientsService} from '../../services/patients/patients.service';
import {Subscription} from 'rxjs';
import {DiagnosisService} from '../../services/diagnosis/diagnosis.service';
import {NewAppointmentComponent} from '../../appointments/new-appointment/new-appointment.component';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, OnDestroy {
  public patients: Patient[];
  private subscriptions: Subscription[] = [];

  constructor(private matDialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private patientsService: PatientsService) {
  }

  ngOnInit() {
    const activatedRouteSub = this.activatedRoute.data.subscribe((data) => {
      this.patients = data.patients.slice();
    });

    const patientsObserverSub = this.patientsService.patientsObserver.subscribe((patients) => {
      this.patients = patients.slice();
    });
    this.subscriptions = [activatedRouteSub, patientsObserverSub];
  }

  addNewPatient() {
    this.matDialog.open(ModifyPatientComponent, {disableClose: true});
  }

  addToVisit(currentPatient) {
    this.matDialog.open(NewAppointmentComponent, {
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

}
