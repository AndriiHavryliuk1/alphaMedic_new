import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidden = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {

  }

  getErrorMessage(formControl: FormControl) {
    return this.authService.getErrorMessage(formControl);
  }

}
