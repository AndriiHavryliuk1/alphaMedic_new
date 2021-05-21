import {APP_INITIALIZER, NgModule, Optional, SkipSelf} from '@angular/core';
import {EnsureModuleLoadedOnceGuard} from './ensure-module-loaded-once-guard';
import {LoadingComponent} from './loading/loading.component';
import {BrowserModule} from '@angular/platform-browser';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from '../app-routing.module';
import {appInitializerFactory, AppInitializerService} from './services/app-initializer.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './services/auth-interceptor.service';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} ha already been loaded. Import Core modules in the AppModule only.`);
  }
}

@NgModule({
  declarations: [LoadingComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    AppInitializerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }, {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AppInitializerService],
      multi: true
    }
  ],
  exports: [LoadingComponent, HeaderComponent]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    //  throwIfAlreadyLoaded(parentModule, 'CoreModule');
    super(parentModule);
  }
}
