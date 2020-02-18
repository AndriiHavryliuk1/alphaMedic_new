import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {EMPTY_STATE_QUESTIONS} from '../teeth-helper';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.css']
})
export class EditPanelComponent implements OnInit, AfterViewInit {
  @Input() state: string;
  @Input() toothNumber: string;
  @Input() viewPoint: {x: number, y: number};
  public questions;
  public title: string;
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

  ngAfterViewInit(): void {
    // cxElement.style.left = (event.viewPoint.x - cxElement.clientWidth) + "px";
    // // need when legend so big and get scrolling
    // const heightDiff = (legendContainer.clientHeight - Math.abs(scrollBar.scrollTop - e.viewPoint.y));
    // cxElement.style.top = heightDiff < cxElement.clientHeight ? ((e.viewPoint.y - scrollBar.scrollTop) - Math.abs(heightDiff - cxElement.clientHeight) - 4) + "px"
    //   : (e.viewPoint.y - scrollBar.scrollTop) + "px";
  }

}
