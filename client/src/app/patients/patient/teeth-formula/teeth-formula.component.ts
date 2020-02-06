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
    debugger;
    console.log(this.lowerTeethChildren);

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const teethFormula = document.querySelector('svg');
      this.modifiedFormula = this.modifyFormula(teethFormula);
    }, 1000);
  }

  private modifyFormula(svg) {

    if (svg.id === ("tooth_17_crown_normal")) {
      debugger;
    }

    if (svg.hasChildNodes()) {
      for (let i = 0; i < svg.children.length; i++) {
        if (svg.children[i].id && this.teethForDelete.some((value) => svg.children[i].id && svg.children[i].id.startsWith(value))) {
          svg.children[i].remove();
          --i;
        } else if (svg.children[i].hasChildNodes() && !svg.children[i].id.startsWith("tooth")) {
          this.modifyFormula(svg.children[i]);
        }
      }
    }

    if (svg.id && this.teethForDelete.some((value) => svg.id && svg.id.startsWith(value))) {
      svg.remove();
    }

    return svg;
  }

}
