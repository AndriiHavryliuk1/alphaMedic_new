import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  CROWN_FRACTURE_VALUES,
  DENTAL_FILLING_STATES, FRACTURE_STATES,
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
  public possibleFractureStates;
  public possibleCrownFractureValues;
  public orthopedicConstructionValues;
  public resorptionValues;
  public sickToothStates;
  public traumaState;
  public showFrontDentalFilling;
  public dentalFillingValues;
  public selectedCrownStates = [];
  public selectedRootStates = [];
  public selectedTraumaState = null;
  public selectedFractureState = null;
  public selectedCrownFractureValue = null;

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
        this.possibleFractureStates = FRACTURE_STATES.slice();
        this.possibleCrownFractureValues = CROWN_FRACTURE_VALUES.slice();
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

  onDentalFillingPanelClickHandler(event, crownState) {
    console.log(event, crownState);
  }

  onDentalFillingValueChangedHandler(value, crownState) {
    const target = value.target as any;
    if (value instanceof MouseEvent && target.id.startsWith("seg_")) {
      const segmentId = target.id;
      const isPresent = crownState.crownValue.segments.contains(segmentId);
      if (isPresent) {
        const index = crownState.crownValue.segments.indexOf(segmentId);
        crownState.crownValue.segments.splice(index, 1);
        target.style.fill = "";
      } else {
        crownState.crownValue.segments.push(segmentId);
        target.style.fill = crownState.fillCrownColor;
      }
    } else {
      crownState.crownValue.fillingState = value;
    }
  }

  onRootsStateChanged(rootStates) {
    this.selectedRootStates = rootStates.slice();
  }

  rootResorptionValueChanged(value) {
    console.log(value);
  }

  sickToothStateChanged(value) {
    console.log(value);
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

  onFractureStateChanged(value) {
    this.selectedFractureState = value;
  }

  onSelectedCrownFractureValueChanged(value) {
    console.log(value);
    this.selectedCrownFractureValue = value;
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
    this.addWithoutDuplication(this.crownStates, this.selectedCrownStates, 'crownState');
    this.addWithoutDuplication(this.rootStates, this.selectedRootStates, 'rootState');
    this.close.emit({
      toothStates: this.toothStates,
      crownStates: this.crownStates,
      rootStates: this.rootStates
    });
  }

  private addWithoutDuplication(items, itemsToAdd, property) {
    const filteredItems = itemsToAdd.reduce((res, item) => {
      if (items.find(i => i[property] === item[property])) {
        res.push(item);
      }
      return res;
    }, []);
    items = items.concat(filteredItems);
  }

}
