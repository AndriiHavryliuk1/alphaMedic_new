import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {TeethResource} from './teeth.resource';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeethService {

  private cachedTeeth = [];

  constructor(private teethResource: TeethResource) { }

  public getTeeth() {
    return new Promise((resolve, reject) => {
      this.teethResource.getTeeth().pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((teeth: any) => {
        this.cachedTeeth = teeth;
        resolve(teeth);
      });
    });
  }

  public getCachedTeeth() {
    return this.cachedTeeth;
  }

}
