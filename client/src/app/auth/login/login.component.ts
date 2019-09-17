import {Component, OnInit} from '@angular/core';
import {FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidden = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor() {
  }

  ngOnInit() {
  }

  login() {

  }

  getErrorMessage(type: string) {
    switch (type) {
      case 'email':
        return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' :
            '';
      case 'password':
        return this.password.hasError('required') ? 'You must enter a value' :
          this.password.hasError('minlength') ? 'Value must has more then 6 length' :
            '';
    }
  }

}
