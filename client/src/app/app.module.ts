import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from './services/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AppointmentsModule} from './appointments/appointments.module';
import {ServicesService} from './services/services/services.service';
import {DiagnosisService} from './services/diagnosis/diagnosis.service';
import {TeethService} from './services/teeth/teeth.service';
import {AuthModule} from './auth/auth.module';
import {StartPageRoutingModule} from './start-page/start-page-routing.module';
import * as moment from 'moment';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PatientsEffects} from './store/effects/patients.effects';
import {CoreModule} from './core/core.module';

// weekStartsOn option is ignored when using moment, as it needs to be configured globally for the moment locale
moment.updateLocale('en', {
  week: {
    dow: 1,
    doy: 0,
  },
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppointmentsModule,
    AuthModule,
    CoreModule,
    StartPageRoutingModule,
    StoreModule.forRoot(fromApp.appReducers),
    EffectsModule.forRoot([PatientsEffects])
  ],
  providers: [
    ServicesService,
    DiagnosisService,
    TeethService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
