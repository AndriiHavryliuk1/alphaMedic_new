import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AuthService} from './services/auth/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './services/auth/auth-interceptor.service';
import {appInitializerFactory, AppInitializerService} from './services/app/app-initializer.service';
import {AppointmentsModule} from './appointments/appointments.module';
import {ServicesService} from './services/services/services.service';
import {DiagnosisService} from './services/diagnosis/diagnosis.service';
import {TeethService} from './services/teeth/teeth.service';
import {AuthModule} from './auth/auth.module';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {StartPageRoutingModule} from './start-page/start-page-routing.module';
import * as moment from 'moment';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PatientsEffects} from './store/patients/patients.effects';
import { LoadingComponent } from './loading/loading.component';
import {CustomDateAdapter} from './custom-date-adapter';
import {MAT_DATE_LOCALE} from '@angular/material/core';

// weekStartsOn option is ignored when using moment, as it needs to be configured globally for the moment locale
moment.updateLocale('en', {
  week: {
    dow: 1,
    doy: 0,
  },
});

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppointmentsModule,
    AuthModule,
    StartPageRoutingModule,
    StoreModule.forRoot(fromApp.appReducers),
    EffectsModule.forRoot([PatientsEffects])
  ],
  providers: [
    ServicesService,
    DiagnosisService,
    TeethService,
    AuthService,
    AppInitializerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }, {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AppInitializerService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
