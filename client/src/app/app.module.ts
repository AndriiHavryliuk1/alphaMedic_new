import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AuthService} from './services/auth/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './services/auth/auth-interceptor.service';
import {appInitializerFactory, AppInitializerService} from './services/app/app-initializer.service';
import {SharedModule} from './shared/shared.module';
import {PatientsModule} from './patients/patients.module';
import {AppointmentsModule} from './appointments/appointments.module';
import {ServicesService} from './services/services/services.service';
import {DiagnosisService} from './services/diagnosis/diagnosis.service';
import {TeethService} from './services/teeth/teeth.service';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    PatientsModule,
    AppointmentsModule,
    AuthModule
  ],
  providers: [
    ServicesService,
    DiagnosisService,
    TeethService,
    AuthService,
    AppInitializerService, {
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
