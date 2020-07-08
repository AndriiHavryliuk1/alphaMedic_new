import {Injectable} from '@angular/core';
import {UserSettingsService} from '../user-settings/user-settings.service';
import {TeethService} from '../teeth/teeth.service';
import {ServicesService} from '../services/services.service';
import {DiagnosisService} from '../diagnosis/diagnosis.service';
import {PatientsService} from '../patients/patients.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private userSettingsService: UserSettingsService,
              private teethService: TeethService,
              private servicesService: ServicesService,
              private diagnosisService: DiagnosisService,
              private patientsService: PatientsService) {
  }

  public async getAppData() {
    const userSettings = await this.userSettingsService.getUserSettings() as any;
    if (userSettings.error) {
      return Promise.resolve();
    }
    const promises = [
      this.teethService.getTeeth(),
      this.servicesService.getServices(),
      this.diagnosisService.getDiagnosis(),
      this.patientsService.getPatients()
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
}

export function appInitializerFactory(appInitializerService: AppInitializerService) {
  return () => appInitializerService.getAppData();
}
