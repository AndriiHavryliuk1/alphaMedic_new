import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {sha256} from 'js-sha256';
import CONSTANTS from '../../utils/constants';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';
import {setLoading} from '../../utils/utils';
import {finalize} from 'rxjs/operators';

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

  @HostListener('window:keydown.enter')
  onButtonEnter() {
    this.login();
  }

  login() {
    setLoading();
    if (this.email.invalid) {
      const errorMessage = this.email.hasError('required') ? 'Email is required' : 'Email is invalid';
      this.alertService.showAlert(errorMessage, CONSTANTS.ALERT_DURATION.ERROR, CONSTANTS.ALERT_TYPES.ERROR);
    }
    if (this.password.invalid) {
      this.alertService.showAlert('Password is required', CONSTANTS.ALERT_DURATION.ERROR, CONSTANTS.ALERT_TYPES.ERROR);
    }

    if (this.email.invalid || this.password.invalid) {
      setLoading(false);
      return;
    }

    const userData = {
      email: this.email.value,
      password: sha256(this.password.value)
    };

    this.authService.login(userData).pipe(finalize(() => setLoading(false))).subscribe((data) => {
      this.router.navigate(['user']);
    }, (error: Error) => {
      this.alertService.showAlert(error.message, CONSTANTS.ALERT_DURATION.ERROR, CONSTANTS.ALERT_TYPES.ERROR);
    });

  }

  getErrorMessage(formControl: FormControl) {
    return this.alertService.getErrorMessage(formControl);
  }

}
