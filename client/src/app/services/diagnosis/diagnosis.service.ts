import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {DiagnosisResource} from './diagnosis.resource';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private cachedDiagnosis = [];

  constructor(private diagnosisResource: DiagnosisResource) { }

  public getDiagnosis() {
    return new Promise((resolve, reject) => {
      this.diagnosisResource.getDiagnosis().pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((diagnosis: any) => {
        this.cachedDiagnosis = diagnosis;
        resolve(diagnosis);
      });
    });
  }

  public getCachedDiagnosis() {
    return this.cachedDiagnosis;
  }

}
