import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import {MatAutocompleteModule, MatIconModule, MatInputModule} from '@angular/material';
import { XdAutocompleteComponent } from './xd-autocomplete/xd-autocomplete.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SvgIconComponent, XdAutocompleteComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  exports: [SvgIconComponent, XdAutocompleteComponent]
})
export class SharedModule { }
