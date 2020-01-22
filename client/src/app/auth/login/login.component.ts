import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {sha256} from 'js-sha256';
import CONSTANTS from '../../utils/constants';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidden = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  login() {
    if (this.email.invalid) {
      if (this.email.hasError('required')) {
        this.alertService.showAlert('Email is required', CONSTANTS.ALERT_DURATION.ERROR, CONSTANTS.ALERT_TYPES.ERROR);
      } else {
        this.alertService.showAlert('Email is invalid', CONSTANTS.ALERT_DURATION.ERROR, CONSTANTS.ALERT_TYPES.ERROR);
      }
      return;
    }
    if (this.password.invalid) {
      this.alertService.showAlert('Password is required', CONSTANTS.ALERT_DURATION.ERROR, CONSTANTS.ALERT_TYPES.ERROR);
      return;
    }

    const userData = {
      email: this.email.value,
      password: sha256(this.password.value)
    };

    this.authService.login(userData).subscribe((data) => {
      this.router.navigate(['user']);
    }, (error: Error) => {
      this.alertService.showAlert(error.message, CONSTANTS.ALERT_DURATION.ERROR, CONSTANTS.ALERT_TYPES.ERROR);
    });

  }

  getErrorMessage(formControl: FormControl) {
    return this.alertService.getErrorMessage(formControl);
  }

}
