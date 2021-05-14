import {Optional, SkipSelf} from '@angular/core';
import {EnsureModuleLoadedOnceGuard} from './ensure-module-loaded-once-guard';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} ha already been loaded. Import Core modules in the AppModule only.`);
  }
}


export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  //  throwIfAlreadyLoaded(parentModule, 'CoreModule');
    super(parentModule);
  }
}
