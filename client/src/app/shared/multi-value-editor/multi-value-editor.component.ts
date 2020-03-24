import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';

interface IMultiValueItem {
  text: string;
  id: string;
}

@Component({
  selector: 'app-multi-value-editor',
  templateUrl: './multi-value-editor.component.html',
  styleUrls: ['./multi-value-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiValueEditorComponent implements OnInit {

  public itemCtrl = new FormControl();
  public filteredItems: Observable<IMultiValueItem[]>;

  @Input() public selectedItems: IMultiValueItem[] = [];
  @Input() public possibleItems: IMultiValueItem[] = [];
  @Input() public menuClass: string;
  @Input() public floatLabel: string;
  @Input() public formClass: string;
  @Input() public placeholder: string;

  @Output() private changed = new Subject();

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild(MatAutocompleteTrigger, {static: false}) private autocompleteTrigger: MatAutocompleteTrigger;

  constructor() {

  }

  ngOnInit(): void {
    this.placeholder = this.placeholder || "New items...";
    this.selectedItems.forEach((value) => {
      const index = this.possibleItems.findIndex(item => item.text === value.text);
      if (index > -1) {
        this.possibleItems.splice(index, 1);
      }
    });
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(""),
      map((item: IMultiValueItem) => this.filter(item)));
  }

  /**
   * onBlur callback
   * @param autocomplete - current mat-autocomplete object
   */
  onBlur(autocomplete: MatAutocomplete) {
    // need timeout to wait for value applied
    setTimeout(() => {
      if (autocomplete.isOpen) {
        this.autocompleteTrigger.closePanel();
      }
    }, 150);
  }

  remove(item: IMultiValueItem): void {
    const index = this.selectedItems.findIndex(it => it.text === item.text);
    if (index > -1) {
      this.possibleItems.push(item);
      this.selectedItems.splice(index, 1);
      this.itemCtrl.setValue(this.itemInput.nativeElement.value);
      this.changed.next(this.selectedItems);
    }
  }

  selected(selectedValue: IMultiValueItem): void {
    const index = this.possibleItems.findIndex(it => it.text === selectedValue.text);
    if (index > -1) {
      this.possibleItems.splice(index, 1);
      this.selectedItems.push(selectedValue);
      this.itemInput.nativeElement.value = '';
      this.itemCtrl.setValue(null);
      this.changed.next(this.selectedItems);
    }
  }

  public openAutocomplete(autocomplete: MatAutocomplete) {
    if (!autocomplete.isOpen) {
      this.autocompleteTrigger.openPanel();
    }
  }

  private filter(value: IMultiValueItem | string): IMultiValueItem[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : (!value ? '' : value.text.toLowerCase());
    return this.possibleItems.filter(item => item.text.toLowerCase().indexOf(filterValue) > -1);
  }
}
