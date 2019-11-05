import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { sha256 } from 'js-sha256';
import {AlertService} from '../../services/alertService';
import CONSTANTS from '../../utils/constants';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public minDate = new Date('01-01-1900');
  public maxDate = new Date();
  public firstName = new FormControl('', [Validators.required]);
  public lastName = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public confirmPassword = new FormControl('', [Validators.required]);
  public birthday = new FormControl(null);
  public gender = new FormControl('male');

  constructor(private authService: AuthService, private alertService: AlertService, private http: HttpClient) { }

  ngOnInit() {
  }


  getErrorMessage(formControl: FormControl) {
    return this.authService.getErrorMessage(formControl);
  }

  register() {
    if (this.firstName.invalid || this.lastName.invalid
      || this.email.invalid || this.password.invalid
      || this.confirmPassword.invalid || this.birthday.invalid) {
      this.alertService.showAlert('Registration data is not valid', CONSTANTS.ALERT_DURATION.ERROR, CONSTANTS.ALERT_TYPES.ERROR);
      return;
    }

    const newUser = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: sha256(this.password.value),
      birthday: this.birthday.value,
      gender: this.gender.value
    };

    this.http.post(CONSTANTS.SERVER_URL + "auth/signup", newUser).subscribe((data) => {
      console.log(data);
      return data;
    });

   // this.authService.register(newUser).unsubscribe();
  }

}
