import {
  ComparisonData,
  DamageCalculatorService,
} from '../../services/damage-calculator.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ChartConfiguration } from 'chart.js';
import { SharedStateService } from '../../services/shared-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bonus-diff-chart',
  templateUrl: './bonus-diff-chart.component.html',
  styleUrls: ['./bonus-diff-chart.component.scss'],
})
export class BonusDiffChartComponent implements OnInit, OnDestroy {
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Diferença % Dano Com Bônus (Ômega vs Alfa)',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'HP do Monstro',
        },
      },
      y: {
        title: {
          display: true,
          text: '% (positivo = Ômega deu mais dano)',
        },
      },
    },
  };

  baseDamage: number = 400;
  alfaBonus: number = 16.0;
  omegaBonus: number = 6.5;

  private subscription: Subscription = new Subscription();

  constructor(
    private calculator: DamageCalculatorService,
    private sharedState: SharedStateService
  ) {}

  ngOnInit(): void {
    // Carregar estado inicial
    const state = this.sharedState.getState();
    this.baseDamage = state.baseDamage;
    this.alfaBonus = state.alfaBonus;
    this.omegaBonus = state.omegaBonus;
    this.updateChart();

    // Inscrever-se nas mudanças de estado
    this.subscription.add(
      this.sharedState.state$.subscribe((state) => {
        this.baseDamage = state.baseDamage;
        this.alfaBonus = state.alfaBonus;
        this.omegaBonus = state.omegaBonus;
        this.updateChart();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateChart(): void {
    const data: ComparisonData[] = this.calculator.generateChartData(
      this.baseDamage,
      this.alfaBonus,
      this.omegaBonus
    );

    // Criar cores dinâmicas: verde para Alfa (valores negativos), vermelho para Ômega (valores positivos)
    const pointBackgroundColors = data.map((d) =>
      d.bonusDiffPercent < 0 ? '#528e4e' : '#8e2f2c'
    );

    this.lineChartData = {
      labels: data.map((d) => d.hp.toString()),
      datasets: [
        {
          data: data.map((d) => d.bonusDiffPercent),
          label: 'Diferença % (Ômega - Alfa)',
          borderColor: (context: any) => {
            const index = context.dataIndex;
            if (index === undefined) return '#9933ff';
            return data[index].bonusDiffPercent < 0 ? '#528e4e' : '#8e2f2c';
          },
          backgroundColor: (context: any) => {
            const index = context.dataIndex;
            if (index === undefined) return 'rgba(153, 51, 255, 0.1)';
            return data[index].bonusDiffPercent < 0
              ? 'rgba(82, 142, 78, 0.1)'
              : 'rgba(142, 47, 44, 0.1)';
          },
          pointBackgroundColor: pointBackgroundColors,
          pointBorderColor: pointBackgroundColors,
          pointRadius: 3,
          pointHoverRadius: 5,
          segment: {
            borderColor: (ctx: any) => {
              const currentValue = ctx.p1.parsed.y;
              return currentValue !== null && currentValue < 0
                ? '#528e4e'
                : '#8e2f2c';
            },
          },
          tension: 0.1,
        },
      ],
    };
  }

  onBaseDamageChange(): void {
    if (this.baseDamage > 0) {
      this.sharedState.setBaseDamage(this.baseDamage);
      this.updateChart();
    }
  }

  onBonusChange(): void {
    this.sharedState.updateState({
      alfaBonus: this.alfaBonus,
      omegaBonus: this.omegaBonus,
    });
    this.updateChart();
  }
}
