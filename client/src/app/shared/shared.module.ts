import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {HighlightPipe, AutocompleteComponent} from './autocomplete/autocomplete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import { ClickOutDirective } from './clickOut/click-out.directive';

@NgModule({
  declarations: [SvgIconComponent, AutocompleteComponent, HighlightPipe, PlaceholderDirective, ClickOutDirective],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule
  ],
  exports: [SvgIconComponent, AutocompleteComponent, PlaceholderDirective, ClickOutDirective]
})
export class SharedModule { }
