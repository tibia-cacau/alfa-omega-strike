import { RouterModule, Routes } from '@angular/router';

import { BonusDamageChartComponent } from './components/bonus-damage-chart/bonus-damage-chart.component';
import { BonusDiffChartComponent } from './components/bonus-diff-chart/bonus-diff-chart.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/calculator', pathMatch: 'full' },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'bonus-damage', component: BonusDamageChartComponent },
  { path: 'bonus-diff', component: BonusDiffChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
