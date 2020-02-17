import {Component, Input, OnInit} from '@angular/core';
import {EMPTY_STATE_QUESTIONS} from '../teeth-helper';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.css']
})
export class EditPanelComponent implements OnInit {
  @Input() state: string;
  @Input() toothNumber: string;
  public questions;
  public title: string;

  constructor() {
  }

  ngOnInit(): void {
    switch (this.state) {
      default:
        this.title = this.toothNumber;
        this.questions = EMPTY_STATE_QUESTIONS.slice();
    }
  }

  emptyStateChanged(value) {
    console.log(value);
  }

}
