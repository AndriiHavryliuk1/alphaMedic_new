import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {concatMap, mergeMap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit, OnDestroy {

  name = new FormControl();
  subs: Subscription[] = [];

  constructor() {
  }

  ngOnInit() {
    debugger;
    this.subs.push(this.name.valueChanges.pipe(switchMap((value) => {
      return this.simulateServer(value);
    })).subscribe(value => {
      console.log(value);
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private simulateServer(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value);
      }, Math.random() * 1000);
    });
  }

}
