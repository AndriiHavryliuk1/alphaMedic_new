import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {getAncestorByClass} from '../../../utils/utils';

@Directive({
  selector: '[appClickOut]'
})
export class ClickOutDirective {

  @Input() rootClassForSkip;
  @Output() appClickOut = new EventEmitter();
  private firstClick = true;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('window:click', ['$event'])
  onClickListener(event) {
    if (!this.firstClick && !this.elementRef.nativeElement.contains(event.target)
      && !(this.rootClassForSkip && getAncestorByClass(this.rootClassForSkip, event.target))
      && !getAncestorByClass("mat-autocomplete-panel", event.target)) {
      this.appClickOut.emit();
    }
    this.firstClick = false;
  }

}
