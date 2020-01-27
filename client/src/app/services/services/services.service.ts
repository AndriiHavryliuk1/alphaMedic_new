import {Injectable} from '@angular/core';
import {catchError, take} from 'rxjs/operators';
import {ServicesResource} from './services.resource';
import {throwError} from 'rxjs';
import {Service} from '../../models/service';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private cachedServices = [];

  constructor(private servicesResource: ServicesResource) { }

  public getServices() {
    return new Promise<Service[]>((resolve, reject) => {
      this.servicesResource.getServices().pipe(take(1), catchError((error) => {
        return throwError(reject(error));
      })).subscribe((services: Service[]) => {
        this.cachedServices = services;
        resolve(services);
      });
    });
  }

  public getCachedServices() {
    return this.cachedServices;
  }

}
