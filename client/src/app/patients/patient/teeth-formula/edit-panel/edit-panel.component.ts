import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  DENTAL_FILLING_STATES,
  HEALTH_TOOTH_QUESTIONS,
  ORTHOPEDIC_CONSTRUCTION_VALUES,
  REMOVED_TOOTH_STATE_QUESTIONS,
  RESORPTION_VALUES,
  ROOT_STATE_QUESTIONS,
  ROOT_STATES, SICK_TOOTH_STATES,
  TEETH_CROWN_STATES, TRAUMA_STATES
} from '../teeth-helper';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.scss']
})
export class EditPanelComponent implements OnInit, AfterViewInit {
  @Input() panelState: string = null;
  @Input() toothNumber: string;
  @Input() toothId: string;
  @Input() viewPoint: { x: number, y: number };
  @Output() public close = new EventEmitter();
  public questions;
  public title: string;
  public initialState: string;
  public possibleCrownStates;
  public possibleRootStates;
  public possibleTraumaStates;
  public orthopedicConstructionValues;
  public resorptionValues;
  public sickToothStates;
  public traumaState;
  public showFrontDentalFilling;
  public dentalFillingValues;
  public selectedCrownStates = [];
  public selectedRootStates = [];
  public selectedTraumaState = null;

  private toothStates = [];
  private crownStates = [];
  private rootStates = [];

  private statesHistory = [];

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.initialState = this.panelState;
    const lastFrontTooth = this.toothId.indexOf('child') > -1 ? 3 : 5;
    this.showFrontDentalFilling = +this.toothNumber.split('.')[1] <= lastFrontTooth;
    this.init();
  }

  ngAfterViewInit(): void {
    const currentElement = this.elementRef.nativeElement.children[0];
    currentElement.style.left = this.viewPoint.x + 'px';
    let heightDiff = 0;
    if (this.viewPoint.y + currentElement.clientHeight > document.body.scrollHeight) {
      heightDiff = (this.viewPoint.y + currentElement.clientHeight + 15) - document.body.scrollHeight;
    }

    currentElement.style.top = this.viewPoint.y - heightDiff + 'px';
  }

  init() {
    this.title = 'Зуб ' + this.toothNumber;
    switch (this.panelState) {
      case 'TOOTH_MISSING':
        this.title = 'Зуб ' + this.toothNumber + ' відсутній зуб';
        this.questions = REMOVED_TOOTH_STATE_QUESTIONS.slice();
        break;
      case 'SICK_TOOTH':
        this.possibleCrownStates = TEETH_CROWN_STATES.slice();
        this.dentalFillingValues = DENTAL_FILLING_STATES.slice();
        this.possibleRootStates = ROOT_STATES.slice();
        this.orthopedicConstructionValues = ORTHOPEDIC_CONSTRUCTION_VALUES.slice();
        this.resorptionValues = RESORPTION_VALUES.slice();
        this.sickToothStates = SICK_TOOTH_STATES.slice();
        this.possibleTraumaStates = TRAUMA_STATES.slice();
        break;
      case 'HEALTH_TOOTH_QUESTION':
        this.questions = HEALTH_TOOTH_QUESTIONS.slice();
        break;
      case null:
        this.questions = ROOT_STATE_QUESTIONS.slice();
        break;
    }
    this.statesHistory.push(this.panelState);
  }

  healthToothQuestionChanged(value) {
    if (value.state) {
      this.closePanel();
    } else if (value.nextPanelState) {
      this.panelState = value.nextPanelState;
      this.init();
    }
  }

  backToPreviousState() {
    this.statesHistory.pop();
    this.panelState = this.statesHistory.pop() || null;
    this.init();
  }

  rootStateChanged(value) {
    switch (value.nextPanelState) {
      case 'HEALTH_TOOTH_QUESTION':
      case 'TOOTH_MISSING':
        this.panelState = value.nextPanelState;
        this.init();
        break;
      case 'IMPLANT':
      case 'TOOTH_BRIDGE':
        this.closePanel();
        break;
      default:
        this.closePanel();
    }
  }

  onCrownStatesChanged(crownStates) {
    this.selectedCrownStates = crownStates.slice();
    console.log(crownStates);
  }

  onCrownOrthopedicValueChanged(orthopedicValues) {
    console.log(orthopedicValues);
  }

  onDentalFillingPanelClickHandler(event) {
    console.log(event);
  }

  onRootsStateChanged(rootStates) {
    this.selectedRootStates = rootStates.slice();
  }

  resorptionValueChanged(value) {
    console.log(value);
  }

  sickToothStateChanged(value) {
    if (value.state) {
      const index = this.toothStates.findIndex(tooth => tooth.state === value.state);
      if (index > -1) {
        this.toothStates.splice(index, 1);
      } else {
        this.toothStates.push(value.state);
      }
    }
  }

  onTraumaStateChanged(value) {
    this.selectedTraumaState = value;
  }

  missingToothStateChanged(value) {
    switch (value.state) {
      case 'ADENTIA':
        this.toothStates.push(value);
        this.closePanel();
        break;
      case 'RETINATED':
        this.toothStates.push(value);
        this.closePanel();
        break;
      case 'REMOVED':
        this.toothStates.push(value);
        this.closePanel();
        break;
      default:
        this.closePanel();
    }
  }

  public closePanel() {
    this.close.emit({
      toothStates: this.toothStates,
      crownStates: this.crownStates,
      rootStates: this.rootStates
    });
  }

}
