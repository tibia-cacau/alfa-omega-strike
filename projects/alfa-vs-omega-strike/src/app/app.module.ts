import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseChartDirective } from 'ng2-charts';
import { BonusDamageChartComponent } from './components/bonus-damage-chart/bonus-damage-chart.component';
import { BonusDiffChartComponent } from './components/bonus-diff-chart/bonus-diff-chart.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphInterpretationComponent } from './components/graph-interpretation/graph-interpretation.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    BonusDamageChartComponent,
    BonusDiffChartComponent,
    GraphInterpretationComponent,
  ],
  imports: [CommonModule, AppRoutingModule, FormsModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class AppModule {}
