import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[xdPlaceholder]'
})
export class XdCalendarPlaceholderDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
