import {Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[xdCalendarClickOut]'
})
export class XdCalendarClickOutDirective implements OnDestroy {

  @Output() xdCalendarClickOut = new EventEmitter();
  private readonly onClickListener;

  constructor(private elementRef: ElementRef) {
    this.onClickListener = (event) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.xdCalendarClickOut.emit();
      }
    };
    window.addEventListener('click', this.onClickListener, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('click', this.onClickListener, true);
  }

}
