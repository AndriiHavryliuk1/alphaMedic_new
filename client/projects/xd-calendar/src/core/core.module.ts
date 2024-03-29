import {NgModule, Optional, SkipSelf} from '@angular/core';
import {EventBusService} from './services/event-bus.service';
import {XdCalendarService} from './services/xd-calendar.service';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} ha already been loaded. Import Core modules in the AppModule only.`);
  }
}

@NgModule({
  providers: [EventBusService, XdCalendarService]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
