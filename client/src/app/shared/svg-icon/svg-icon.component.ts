import {Component, Input, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {
  @Input()
  public svgSrc: string;

  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'xd-svg-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl(this.svgSrc)
    );
  }

}
