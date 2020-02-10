import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LOWER_TEETH, LOWER_TEETH_CHILDREN, UPPER_TEETH, UPPER_TEETH_CHILDREN} from './teeth-helper';

@Component({
  selector: 'app-teeth-formula',
  templateUrl: './teeth-formula.component.html',
  styleUrls: ['./teeth-formula.component.css']
})
export class TeethFormulaComponent implements OnInit, AfterViewInit{

  public upperTeeth = UPPER_TEETH;
  public lowerTeeth = LOWER_TEETH;
  public upperTeethChildren = UPPER_TEETH_CHILDREN;
  public lowerTeethChildren = LOWER_TEETH_CHILDREN;
  public modifiedFormula;

  private teethForDelete = ['tooth_16', 'tooth_17', 'tooth_18', 'tooth_26', 'tooth_27', 'tooth_28', 'tooth_36', 'tooth_37', 'tooth_38', 'tooth_46', 'tooth_47', 'tooth_48'];

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const teethFormula = document.querySelector('svg');
      this.modifiedFormula = this.modifyFormula(teethFormula);
    }, 1000);
  }

  private modifyFormula(svg) {
    if (svg.hasChildNodes()) {
      for (const tooth of svg.children) {
        if (tooth.id && tooth.id.indexOf("tooth") > -1 && tooth.id.indexOf("normal") > -1) {
          tooth.setAttribute("style", "display: inline-block; cursor: pointer;");
        } else if (tooth.hasChildNodes()) {
          this.modifyFormula(tooth);
        }
      }
    }

    if (svg.id && svg.id.indexOf("tooth") > -1 && svg.id.indexOf("normal") > -1) {
      svg.setAttribute("style", "display: inline-block; cursor: pointer;");
    }

    return svg;
  }

}
