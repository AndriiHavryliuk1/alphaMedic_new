import {ChangeDetectionStrategy, Component, ElementRef, Input, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-panel-options',
  templateUrl: './edit-panel-options.component.html',
  styleUrls: ['./edit-panel-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPanelOptionsComponent {
  @Input() questions;
  @Input() singleSelection: boolean;
  @Input() multiSelection: boolean;
  @Input() required: boolean;
  @Input() type = 'LIST';
  @Output() selected = new Subject();
  @ViewChild('checkboxes') checkboxes: ElementRef;
  @ViewChild('checkbox') checkbox: MatCheckbox;

  public onClick(event, question) {
    const liElement = event.target;
    if (this.singleSelection || this.multiSelection) {
      if (liElement.classList.contains('selected')) {
        liElement.classList.remove('selected');
      } else {
        liElement.classList.add('selected');
      }

      if (this.singleSelection && liElement.parentNode) {
        const children = liElement.parentNode.querySelectorAll('li');
        children.forEach((li) => {
          if (li !== liElement && li.classList.contains('selected')) {
            li.classList.remove('selected');
          }
        });
      }
    }
    this.selected.next(question);
  }

  public onChange(value) {
    this.selected.next(value.value);
  }

  public onCheckBoxChanged({event, value}) {
    if (this.required) {
      const checkedBoxes = this.checkboxes.nativeElement.querySelectorAll('.mat-checkbox-checked');
      if (checkedBoxes.length === 1 && event.source.id === checkedBoxes[0].id) {
        event.source.checked = true;
        return;
      }
    }
    this.selected.next({checked: event.checked, value});
  }
}
