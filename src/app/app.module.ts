import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseChartDirective } from 'ng2-charts';
import { BonusDamageChartComponent } from './components/bonus-damage-chart/bonus-damage-chart.component';
import { BonusDiffChartComponent } from './components/bonus-diff-chart/bonus-diff-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    BonusDamageChartComponent,
    BonusDiffChartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent],
})
export class AppModule {}
