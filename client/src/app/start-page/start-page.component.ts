import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  public events = [];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(take(1)).subscribe((data) => {
      data.appointments.forEach(visit => {
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
        this.events.push(event);
      });
    });
    console.log(this.events);
  }

}
