import {Injectable} from '@angular/core';
import {UserSettingsService} from '../user-settings/user-settings.service';
import {TeethService} from '../teeth/teeth.service';
import {ServicesService} from '../services/services.service';
import {DiagnosisService} from '../diagnosis/diagnosis.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {skip, take} from 'rxjs/operators';
import {selectPatients} from '../../store/app.reducer';
import {PatientsActions} from '../../store/patients/patients.action';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private userSettingsService: UserSettingsService,
              private teethService: TeethService,
              private servicesService: ServicesService,
              private diagnosisService: DiagnosisService,
              private store: Store<fromApp.AppState>) {
  }

  public async getAppData() {
    const userSettings = await this.userSettingsService.getUserSettings() as any;
    if (userSettings.error) {
      return Promise.resolve();
    }

    this.store.dispatch(PatientsActions.loadPatients());

    const promises = [
      this.teethService.getTeeth(),
      this.servicesService.getServices(),
      this.diagnosisService.getDiagnosis(),
      this.getStatePromise(selectPatients)
    ];

    return Promise.all(promises.map(this.reflect));
  }

  /**
   * Differentiate resolved result from rejected
   */
  private reflect(promise) {
    return promise.then((v) => {
      return {data: v, status: 'fulfilled'};
    }, (e) => {
      return {err: e, status: 'rejected'};
    });
  }

  private getStatePromise(selector) {
    return new Promise((resolve) => {
      this.store.select(selector).pipe(skip(1), take(1)).subscribe((data) => resolve(data));
    });
  }
}

export function appInitializerFactory(appInitializerService: AppInitializerService) {
  return () => appInitializerService.getAppData();
}
