import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {NewAppointmentDialogComponent} from '../appointments/new-appointment-dialog/new-appointment-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  public events = [];

  constructor(private activatedRoute: ActivatedRoute,
              private matDialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(take(1)).subscribe((data) => {
      this.events = data.appointments.map(visit => this.adaptVisitToEvent(visit));
    });
  }

  addToVisit(data) {
    const dialogRef = this.matDialog.open(NewAppointmentDialogComponent, {
      data: {selectedDate: data.date},
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(visit => {
      if (visit) {
        this.events.push(this.adaptVisitToEvent(visit));
        this.events = this.events.slice();
      }
    });
  }

  private adaptVisitToEvent(visit) {
    const event = {
      name: 'Прийом',
      dateStart: new Date(visit.dateStart),
      dateEnd: new Date(visit.dateEnd),
      additionalInfos: [{
        name: 'Пацієнт',
        description: visit.patient.fullName,
        link: visit.patient._id
      }, {
        name: 'Лікар',
        description: visit.doctor.fullName,
        link: visit.doctor._id
      }]
    };
    if (visit.provisionalDiagnosis) {
      event.additionalInfos.push({
        name: 'Діагноз',
        description: visit.provisionalDiagnosis.join(', '),
        link: ''
      });
    }
    return event;
  }

}
