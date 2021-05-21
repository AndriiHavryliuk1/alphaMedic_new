import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  CROWN_FRACTURE_VALUES,
  DENTAL_FILLING_STATES, FRACTURE_STATES,
  HEALTH_TOOTH_QUESTIONS,
  ORTHOPEDIC_CONSTRUCTION_VALUES,
  REMOVED_TOOTH_STATE_QUESTIONS,
  RESORPTION_VALUES,
  ROOT_STATE_QUESTIONS, ROOT_STATE_VALUES,
  ROOT_STATES, SICK_TOOTH_STATES,
  TEETH_CROWN_STATES, TRAUMA_STATES
} from '../teeth-helper';
import * as cloneDeep from 'lodash/cloneDeep';

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
  public possibleRootStateValues;
  public orthopedicConstructionValues;
  public resorptionValues;
  public sickToothStates;
  public sickToothState;
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
        this.questions = cloneDeep(REMOVED_TOOTH_STATE_QUESTIONS);
        break;
      case 'SICK_TOOTH':
        this.possibleCrownStates = cloneDeep(TEETH_CROWN_STATES);
        this.dentalFillingValues = cloneDeep(DENTAL_FILLING_STATES);
        this.possibleRootStates = cloneDeep(ROOT_STATES);
        this.orthopedicConstructionValues = cloneDeep(ORTHOPEDIC_CONSTRUCTION_VALUES);
        this.resorptionValues = cloneDeep(RESORPTION_VALUES);
        this.sickToothStates = cloneDeep(SICK_TOOTH_STATES);
        this.possibleTraumaStates = cloneDeep(TRAUMA_STATES);
        this.possibleFractureStates = cloneDeep(FRACTURE_STATES);
        this.possibleCrownFractureValues = cloneDeep(CROWN_FRACTURE_VALUES);
        this.possibleRootStateValues = cloneDeep(ROOT_STATE_VALUES);
        break;
      case 'HEALTH_TOOTH_QUESTION':
        this.questions = cloneDeep(HEALTH_TOOTH_QUESTIONS);
        break;
      case null:
        this.questions = cloneDeep(ROOT_STATE_QUESTIONS);
        break;
    }
    this.statesHistory.push(this.panelState);
  }

  healthToothQuestionChanged(value) {
    if (value.state) {
      this.toothStates.push(value);
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
      default:
        this.toothStates.push(value);
        this.closePanel();
    }
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

  onCrownStatesChanged(crownStates) {
    if (crownStates.length > this.selectedCrownStates.length) {
      const elemForAdd = crownStates.find(crown => !this.selectedCrownStates.find(inner => inner.crownState === crown.crownState));
      this.selectedCrownStates.push(cloneDeep(elemForAdd));
    } else {
      const elemForRemove = this.selectedCrownStates.find(crown => !crownStates.find(inner => inner.crownState === crown.crownState));
      this.removeFromArray(this.selectedCrownStates, 'crownState', elemForRemove.crownState);
    }
  }

  onCrownOrthopedicValueChanged(orthopedicValues, crownState) {
    crownState.crownValue = cloneDeep(orthopedicValues);
  }

  onDentalFillingValueChangedHandler(value, crownState) {
    const target = value.target as any;
    if (value instanceof MouseEvent && target.id.startsWith("seg_")) {
      const segmentId = target.id;
      const isPresent = crownState.crownValue.segments.includes(segmentId);
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
    this.selectedRootStates = cloneDeep(rootStates);
  }

  onRootResorptionValueChanged(value, root) {
    root.rootValues = [value];
  }

  onSickToothStateChanged(changes) {
    this.sickToothState = changes.checked ? changes.value : null;
  }

  onTraumaStateChanged(value) {
    this.selectedTraumaState = value;
  }

  onFractureStateChanged(value) {
    this.selectedFractureState = value;
  }

  onSelectedCrownFractureValueChanged(value) {
    this.selectedFractureState.crownValue = value;
  }

  onRootStateValueChanged(changes, root) {
    if (changes.checked) {
      root.rootValues = this.getWithoutDuplication(root.rootValues, [changes.value], 'rootValue');
    } else {
      this.removeFromArray(root.rootValues, 'rootValue', changes.value.rootValue);
    }
  }

  closePanel() {
    if (this.selectedTraumaState && this.selectedTraumaState.state) {
      this.toothStates.push(this.selectedTraumaState);
    }
    if (this.sickToothState) {
      this.toothStates.push(this.sickToothState);
    }
    if (this.selectedFractureState) {
      if (this.selectedFractureState.rootState) {
        this.rootStates.push(this.selectedFractureState);
      } else {
        this.crownStates.push(this.selectedFractureState);
      }
    }
    this.crownStates = this.getWithoutDuplication(this.crownStates, this.selectedCrownStates, 'crownState');
    this.rootStates = this.getWithoutDuplication(this.rootStates, this.selectedRootStates, 'rootState');
    this.close.emit({
      toothStates: [...new Set(this.toothStates)],
      crownStates: [...new Set(this.crownStates)],
      rootStates: [...new Set(this.rootStates)]
    });
  }

  private getWithoutDuplication(items, itemsToAdd, property) {
    const filteredItems =  itemsToAdd.filter((item) => {
      if (!items.find(i => i[property] === item[property])) {
        return item;
      }
    });
    return filteredItems.concat(items);
  }

  private removeFromArray(array, property, value) {
    const index = array.findIndex(r => r[property] === value);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

}
