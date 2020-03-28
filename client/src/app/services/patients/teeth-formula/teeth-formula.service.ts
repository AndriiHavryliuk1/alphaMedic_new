import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {TeethFormulaResource} from './teeth-formula.resource';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeethFormulaService {

  constructor(private teethFormulaResource: TeethFormulaResource) {
  }

  public getTeethFormula() {
    return new Promise<[]>((resolve, reject) => {
      this.teethFormulaResource.getTeethFormula().pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((response: []) => {
        resolve(response);
      });
    });
  }

  public updateTeethFormula(data) {
    return new Promise((resolve, reject) => {
      this.teethFormulaResource.updateTeethFormula(data).pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((response) => {
        resolve(response);
      });
    });
  }

  public updateTooth(teethId, data) {
    return new Promise((resolve, reject) => {
      this.teethFormulaResource.updateTooth(teethId, data).pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((response) => {
        resolve(response);
      });
    });
  }

}
