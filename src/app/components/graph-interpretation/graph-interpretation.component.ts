import { Component } from '@angular/core';

@Component({
  selector: 'app-graph-interpretation',
  templateUrl: './graph-interpretation.component.html',
  styleUrls: ['./graph-interpretation.component.scss'],
})
export class GraphInterpretationComponent {
  showInterpretation: boolean = false;

  toggleInterpretation(): void {
    this.showInterpretation = !this.showInterpretation;
  }
}
