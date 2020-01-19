import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated: boolean;
  private userSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isAuthenticated = !!localStorage.getItem('jwt');
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user && user.getToken();
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public signOut() {
    this.authService.logOut();
  }

}
