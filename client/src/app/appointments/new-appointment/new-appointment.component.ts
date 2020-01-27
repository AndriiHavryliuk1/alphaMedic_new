import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DiagnosisService} from '../../services/diagnosis/diagnosis.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {

  public visitForm;
  public diagnosis;

  constructor(public dialogRef: MatDialogRef<NewAppointmentComponent>,
              diagnosisService: DiagnosisService) {
    this.diagnosis = diagnosisService.getCachedDiagnosis().map(value => ({
      id: value._id,
      text: value.name
    }));
  }

  ngOnInit() {
    this.visitForm = new FormGroup({
      patientText: new FormControl(''),
      doctorText: new FormControl(''),
      visitData: new FormControl(null),
      visitTime: new FormControl(null),
      duration: new FormControl(null)
    });
  }



  @HostListener('window:keyup.esc')
  public onKeyUp() {
    this.closeDialog();
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  onDiagnosisChanged(value) {
    console.log(value);
  }

}
