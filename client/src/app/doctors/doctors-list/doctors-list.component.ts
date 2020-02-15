import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Doctor} from "../doctor.model";

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  doctors: Doctor[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activatedRoute.data);
    this.activatedRoute.data.subscribe((data) => {
      this.doctors = data['doctors'];
      console.log(this.doctors);
    });
  }

  trackByIndex(index, item) {
    return item.id;
  }

}
