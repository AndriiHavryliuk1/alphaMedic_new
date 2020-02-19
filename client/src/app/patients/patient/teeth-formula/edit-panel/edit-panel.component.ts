import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EMPTY_STATE_QUESTIONS} from '../teeth-helper';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.scss']
})
export class EditPanelComponent implements OnInit, AfterViewInit {
  @Input() state: string;
  @Input() toothNumber: string;
  @Input() viewPoint: {x: number, y: number};
  public questions;
  public title: string;
  @Output() public close = new EventEmitter();

  constructor(private elementRef: ElementRef) {
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

  ngAfterViewInit(): void {
    const currentElement = this.elementRef.nativeElement.children[0];
    currentElement.style.left = this.viewPoint.x + "px";
    let heightDiff = 0;
    if (this.viewPoint.y + currentElement.clientHeight > document.body.scrollHeight) {
      heightDiff = (this.viewPoint.y + currentElement.clientHeight + 15) - document.body.scrollHeight;
    }

    currentElement.style.top = this.viewPoint.y - heightDiff + "px";
  }

  public closePanel() {
    this.close.emit();
  }

}
