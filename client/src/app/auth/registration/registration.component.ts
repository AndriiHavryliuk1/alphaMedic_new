import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {sha256} from 'js-sha256';
import {AlertService} from '../../services/alert.service';
import {Constants} from '../../utils/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public minDate = new Date('01-01-1900');
  public maxDate = new Date();
  public name = new FormControl('', [Validators.required]);
  public surname = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public confirmedPassword = new FormControl('', [Validators.required]);
  public birthday = new FormControl(null);
  public gender = new FormControl(Constants.GENDER.MALE);
  public genderValues = Constants.GENDER;

  constructor(private authService: AuthService, private alertService: AlertService) {
  }

  ngOnInit() {
  }


  getErrorMessage(formControl: FormControl) {
    return this.alertService.getErrorMessage(formControl);
  }

  register() {
    if (this.name.invalid || this.surname.invalid
      || this.email.invalid || this.password.invalid
      || this.confirmedPassword.invalid || this.birthday.invalid) {
      this.alertService.showAlert('Registration data is not valid', Constants.ALERT_DURATION.ERROR, Constants.ALERT_TYPES.ERROR);
      return;
    }

    const newUser = {
      name: this.name.value,
      surname: this.surname.value,
      email: this.email.value,
      password: sha256(this.password.value),
      birthday: this.birthday.value,
      gender: this.gender.value,
      returnSecuredToken: true
    };

    this.authService.register(newUser).subscribe((data) => {
      this.alertService.showAlert('Registered successfully', Constants.ALERT_DURATION.ERROR, Constants.ALERT_TYPES.SUCCESS);
      console.log(data);
      this.initFields();
    }, (error) => {
      console.log(error);
     // this.initFields();
    });

    // this.authService.register(newUser).unsubscribe();
  }

  private initFields() {
    this.name = new FormControl('', [Validators.required]);
    this.surname = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.confirmedPassword = new FormControl('', [Validators.required]);
    this.birthday = new FormControl(null);
    this.gender = new FormControl('male');
  }

}
