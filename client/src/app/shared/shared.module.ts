import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SvgIconComponent} from './svg-icon/svg-icon.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {HighlightPipe, AutocompleteComponent} from './autocomplete/autocomplete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlaceholderDirective} from './directives/placeholder/placeholder.directive';
import {ClickOutDirective} from './directives/clickOut/click-out.directive';
import {MultiValueEditorComponent} from './multi-value-editor/multi-value-editor.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    SvgIconComponent,
    AutocompleteComponent,
    HighlightPipe,
    PlaceholderDirective,
    ClickOutDirective,
    MultiValueEditorComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    SvgIconComponent,
    AutocompleteComponent,
    PlaceholderDirective,
    ClickOutDirective,
    MultiValueEditorComponent
  ]
})
export class SharedModule {
}
