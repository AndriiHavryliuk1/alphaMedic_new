import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HEALTH_TOOTH_QUESTIONS, REMOVED_TOOTH_STATE_QUESTIONS, ROOT_STATE_QUESTIONS} from '../teeth-helper';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.scss']
})
export class EditPanelComponent implements OnInit, AfterViewInit {
  @Input() state: string = null;
  @Input() toothNumber: string;
  @Input() viewPoint: {x: number, y: number};
  @Output() public close = new EventEmitter();
  public questions;
  public title: string;
  public initialState: string;

  private statesHistory = [];

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.initialState = this.state;
    this.init();
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

  init() {
    this.title = "Зуб " + this.toothNumber;
    switch (this.state) {
      case "TOOTH_MISSING":
        this.title = "Зуб " + this.toothNumber + " відсутній зуб";
        this.questions = REMOVED_TOOTH_STATE_QUESTIONS.slice();
        break;
      case "EARLIER_CARE_STATE":
        break;
      case "HEALTH_TOOTH_QUESTION":
        this.questions = HEALTH_TOOTH_QUESTIONS.slice();
        break;
      case null:
        this.questions = ROOT_STATE_QUESTIONS.slice();
        break;
    }
    this.statesHistory.push(this.state);
  }

  healthToothQuestionChanged(value) {
    if (value.state) {
      this.closePanel();
    } else if (value.nextState) {
      this.state = value.nextState;
      this.init();
    }
  }

  backToPreviousState() {
    this.statesHistory.pop();
    this.state = this.statesHistory.pop() || null;
    this.init();
  }

  rootStateChanged(value) {
    switch (value.nextState) {
      case "TOOTH_MISSING":
        this.state = value.nextState;
        this.init();
        break;
      case 'EARLIER_CARE_QUESTION':
        this.state = value.nextState;
        this.init();
        break;
      case "IMPLANT":
        this.closePanel();
        break;
      case "TOOTH_BRIDGE":
        this.closePanel();
        break;
      default:
        this.closePanel();
    }
  }

  nativeToothQuestionStateChanged(nextState) {
    this.state = nextState;
    this.init();
  }

  removedToothStateChanged(value) {
    switch (value.state) {
      case "ADENTIA":
        this.closePanel();
        break;
      case 'RETINATED':
        this.closePanel();
        break;
      case "REMOVED":
        this.closePanel();
        break;
      default:
        this.closePanel();
    }
  }

  public closePanel() {
    this.close.emit();
  }

}
