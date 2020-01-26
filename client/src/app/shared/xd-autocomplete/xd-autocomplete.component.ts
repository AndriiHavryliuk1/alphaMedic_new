import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

interface IOption {
  text: string;
  id: string;
  onChanged: (value) => {};
}

@Component({
  selector: 'app-xd-autocomplete',
  templateUrl: './xd-autocomplete.component.html',
  styleUrls: ['./xd-autocomplete.component.css']
})
export class XdAutocompleteComponent implements OnInit {
  public myControl = new FormControl();
  @Input()
  public options: IOption[];
  public filteredOptions: Observable<IOption[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  optionSelected(value: IOption) {
    value.onChanged(value);
  }

  private _filter(value: string): IOption[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.text.toLowerCase().includes(filterValue));
  }
}
