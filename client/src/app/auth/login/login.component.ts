import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {sha256} from 'js-sha256';
import {Constants} from '../../utils/constants';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';
import {setLoading} from '../../utils/utils';
import {finalize} from 'rxjs/operators';
import {AppInitializerService} from '../../services/app/app-initializer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidden = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService,
              private appInitializerService: AppInitializerService) {
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
      this.alertService.showAlert(errorMessage, Constants.ALERT_DURATION.ERROR, Constants.ALERT_TYPES.ERROR);
    }
    if (this.password.invalid) {
      this.alertService.showAlert('Password is required', Constants.ALERT_DURATION.ERROR, Constants.ALERT_TYPES.ERROR);
    }

    if (this.email.invalid || this.password.invalid) {
      setLoading(false);
      return;
    }

    const userData = {
      email: this.email.value,
      password: sha256(this.password.value)
    };

    this.authService.login(userData).pipe(finalize(() => setLoading(false))).subscribe(async () => {
      await this.appInitializerService.getAppData();
      this.router.navigateByUrl(this.authService.getReturnUrl());
    }, (error: Error) => {
      this.alertService.showAlert(error.message, Constants.ALERT_DURATION.ERROR, Constants.ALERT_TYPES.ERROR);
    });

  }

  getErrorMessage(formControl: FormControl) {
    return this.alertService.getErrorMessage(formControl);
  }

}
