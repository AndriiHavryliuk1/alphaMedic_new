import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModifyPatientComponent} from '../add-patient/modify-patient.component';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
  }

  addNewPatient() {
    this.matDialog.open(ModifyPatientComponent, { disableClose: true });

  }

}
