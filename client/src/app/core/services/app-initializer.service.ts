import {Injectable} from '@angular/core';
import {UserSettingsService} from '../../services/user-settings/user-settings.service';
import {TeethService} from '../../services/teeth/teeth.service';
import {ServicesService} from '../../services/services/services.service';
import {DiagnosisService} from '../../services/diagnosis/diagnosis.service';
import {Store} from '@ngrx/store';
import {skip, take} from 'rxjs/operators';
import {PatientsActions} from '../../store/actions/patients.action';
import {AppState} from '../../store/app.model';
import {selectPatients} from '../../store/selectors/patients.selector';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private userSettingsService: UserSettingsService,
              private teethService: TeethService,
              private servicesService: ServicesService,
              private diagnosisService: DiagnosisService,
              private store: Store<AppState>) {
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
