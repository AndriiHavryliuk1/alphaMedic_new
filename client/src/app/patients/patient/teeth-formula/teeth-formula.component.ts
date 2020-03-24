import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LOWER_TEETH, LOWER_TEETH_CHILDREN, UPPER_TEETH, UPPER_TEETH_CHILDREN} from './teeth-helper';
import {getAncestorById, getToothNumberFromNumber} from '../../../utils/utils';
import {EditPanelComponent} from './edit-panel/edit-panel.component';
import {PlaceholderDirective} from '../../../shared/placeholder/placeholder.directive';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-teeth-formula',
  templateUrl: './teeth-formula.component.html',
  styleUrls: ['./teeth-formula.component.scss']
})
export class TeethFormulaComponent implements OnInit, OnDestroy {

  public upperTeeth = UPPER_TEETH;
  public lowerTeeth = LOWER_TEETH;
  public upperTeethChildren = UPPER_TEETH_CHILDREN;
  public lowerTeethChildren = LOWER_TEETH_CHILDREN;
  public modifiedFormula;

  @ViewChild(PlaceholderDirective) panelHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  public onFormulaClickHandler(event) {
    const tooth = getAncestorById('tooth', event.target, '');
    if (tooth) {
      const editPanelFactory = this.componentFactoryResolver.resolveComponentFactory(EditPanelComponent);
      this.panelHost.viewContainerRef.clear();
      const editPanel = this.panelHost.viewContainerRef.createComponent(editPanelFactory);
      editPanel.instance.panelState = null;
      editPanel.instance.toothNumber = getToothNumberFromNumber(tooth.id, tooth.id.indexOf('child') > -1);
      editPanel.instance.toothId = tooth.id;
      editPanel.instance.viewPoint = {
        x: event.pageX,
        y: event.pageY
      };

      this.closeSub = editPanel.instance.close.subscribe((value) => {
        console.log(value);
        this.panelHost.viewContainerRef.clear();
        this.closeSub.unsubscribe();
      });
    }

  }

  public modifyFormula(svg) {
    if (svg.hasChildNodes()) {
      for (const tooth of svg.children) {
        if (tooth.id && tooth.id.indexOf('tooth') > -1 && tooth.id.indexOf('normal') > -1) {
          tooth.setAttribute('style', 'display: inline-block; cursor: pointer;');
        } else if (tooth.id && tooth.id.indexOf('tooth') > -1 && tooth.id.indexOf('wrapper') > -1 && tooth.tagName !== 'rect') {
          tooth.setAttribute('style', 'display: inline-block; cursor: pointer;');
          tooth.children[0].setAttribute('style', 'display: inline-block; cursor: pointer;');
        } else if (tooth.hasChildNodes()) {
          this.modifyFormula(tooth);
        }
      }
    }

    // if (svg.id && svg.id.indexOf("tooth") > -1 && svg.id.indexOf("normal") > -1) {
    //   svg.setAttribute("style", "display: inline-block; cursor: pointer;");
    // } else if (svg.id && svg.id.indexOf("tooth") > -1 && svg.id.indexOf("wrapper") > -1 && svg.tagName !== "rect") {
    //   svg.setAttribute("style", "display: inline-block; cursor: pointer;");
    //   svg.children[0].setAttribute("style", "fill: white;");
    // }

    return svg;
  }

}
