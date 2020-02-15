import {Component, ElementRef, Input, OnChanges, OnInit, Output, Pipe, PipeTransform, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DOWN_ARROW, ENTER, UP_ARROW} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import {escapeHTML} from '../../utils/utils';

interface IAutoCompleteItem {
  text: string;
  id: string;
  ngClass: string;
  onChanged?: (value) => {};
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() public items: [IAutoCompleteItem];
  @Input() public selectedItem: IAutoCompleteItem;
  @Input() public notFoundText: string;
  @Input() public placeholder: string;
  @Input() public materialIcon: string;
  @Input() public menuClass: string;
  @Output() public valueChanged = new Subject<IAutoCompleteItem>();
  @ViewChild(MatAutocompleteTrigger, {static: false}) public autocompleteTrigger: MatAutocompleteTrigger;

  public myControl: FormControl;
  public filteredOptions: Observable<IAutoCompleteItem[]>;
  public fn: any;
  public currentValue: IAutoCompleteItem;
  public searchText: string;
  private isNotFoundItem = false;

  constructor(private elementRef: ElementRef) {
  }

  public ngOnInit() {
    if (!this.notFoundText) {
      this.notFoundText = 'NO MATCHES FOUND';
    }
    this.currentValue = this.selectedItem;
    this.searchText = this.selectedItem ? this.selectedItem.text : '';
    this.myControl = new FormControl(this.searchText);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(() => {
          return this.filter(this.myControl.value);
        })
      );

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedItem && !changes.selectedItem.firstChange) {
      this.searchText = this.selectedItem ? this.selectedItem.text : '';
      this.myControl.setValue(this.searchText);
    }
  }

  /**
   * Handler for Option Changed callback
   */
  public onOptionChanged(option) {
    this.currentValue = option;
    if (this.currentValue !== this.selectedItem) {
      this.selectedItem = this.currentValue;
      this.valueChanged.next(this.selectedItem);
    }
  }

  /**
   * Handler for onAutoCompleteOpened callback
   */
  public onAutoCompleteOpened() {
    this.elementRef.nativeElement.children[0].classList.add("menu-showing");
    const cdkOverlayContainer = document.getElementsByClassName("cdk-overlay-container")[0];
    if (cdkOverlayContainer) {
      cdkOverlayContainer.addEventListener('keydown', this.onKeyDown.bind(this), true);
    }
  }

  /**
   * onAutoCompleteClosed callback
   */
  public onAutoCompleteClosed() {
    this.elementRef.nativeElement.children[0].classList.remove('menu-showing');
  }

  /**
   * onBlur callback
   * @param autocomplete - current mat-autocomplete object
   */
  public onBlur(autocomplete: MatAutocomplete) {
    // need timeout to wait for value applied
    setTimeout(() => {
      if (autocomplete.isOpen) {
        this.autocompleteTrigger.closePanel();
      }
    }, 150);
  }

  /**
   *
   * @param autocomplete - current mat-autocomplete object
   */
  public openAutocomplete(autocomplete: MatAutocomplete) {
    if (!autocomplete.isOpen) {
      this.autocompleteTrigger.openPanel();
    }
  }

  /**
   * Filter function to show correct result in dropdown
   */
  private filter(value: string | IAutoCompleteItem): IAutoCompleteItem[] {
    this.searchText = typeof value === 'string' ? value.toLowerCase() : (!value ? "" : value.text.toLowerCase());
    if (this.selectedItem && this.selectedItem.text === this.searchText) {
      return [];
    }
    const results = this.items.filter((item) => item.text.toLowerCase().includes(this.searchText));
    this.isNotFoundItem = !results.length;
    if (this.searchText === '') {
      this.onOptionChanged(null);
    }

    return this.isNotFoundItem ? [{
      id: "notFound",
      text: this.notFoundText,
      ngClass: 'not-found'
    }] : results;
  }

  /**
   * onKeyDown listener, needed to prevent keydown events when "not found" item is shown
   */
  private onKeyDown(event) {
    if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW || event.keyCode === ENTER) {
      if (this.isNotFoundItem) {
        event.stopPropagation();
      }
    }
  }
}


@Pipe({name: 'highlight'})
export class HighlightPipe implements PipeTransform {
  public transform(text: string, search): string {
    const pattern = search
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      .split(' ')
      .filter((t) => t.length > 0)
      .join('|');
    const regex = new RegExp(pattern, 'gi');

    return search ? escapeHTML(text).replace(regex, (match) => `<b>${match}</b>`) : escapeHTML(text);
  }
}
