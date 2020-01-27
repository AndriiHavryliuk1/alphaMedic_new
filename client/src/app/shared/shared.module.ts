import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import {MatAutocompleteModule, MatIconModule, MatInputModule} from '@angular/material';
import {HighlightPipe, AutocompleteComponent} from './autocomplete/autocomplete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SvgIconComponent, AutocompleteComponent, HighlightPipe],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule
  ],
  exports: [SvgIconComponent, AutocompleteComponent]
})
export class SharedModule { }
