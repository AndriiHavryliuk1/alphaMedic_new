import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-edit-panel-options',
  templateUrl: './edit-panel-options.component.html',
  styleUrls: ['./edit-panel-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPanelOptionsComponent {
  @Input() questions;
  @Output() selected = new Subject();
}
