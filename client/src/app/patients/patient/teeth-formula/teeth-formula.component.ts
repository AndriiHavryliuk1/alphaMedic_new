import {Component, OnInit} from '@angular/core';
import {LOWER_TEETH, LOWER_TEETH_CHILDREN, UPPER_TEETH, UPPER_TEETH_CHILDREN} from './teeth-helper';

@Component({
  selector: 'app-teeth-formula',
  templateUrl: './teeth-formula.component.html',
  styleUrls: ['./teeth-formula.component.css']
})
export class TeethFormulaComponent implements OnInit {

  public upperTeeth = UPPER_TEETH;
  public lowerTeeth = LOWER_TEETH;
  public upperTeethChildren = UPPER_TEETH_CHILDREN;
  public lowerTeethChildren = LOWER_TEETH_CHILDREN;

  constructor() {
  }

  ngOnInit() {
    debugger;
    console.log(this.lowerTeethChildren);
  }

}
