import {
  ComparisonData,
  DamageCalculatorService,
} from '../../services/damage-calculator.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { SharedStateService } from '../../services/shared-state.service';
import { Subscription } from 'rxjs';
import annotationPlugin from 'chartjs-plugin-annotation';

// Registrar o plugin de anotação
Chart.register(annotationPlugin);

@Component({
  selector: 'app-bonus-damage-chart',
  templateUrl: './bonus-damage-chart.component.html',
  styleUrls: ['./bonus-damage-chart.component.scss'],
})
export class BonusDamageChartComponent implements OnInit, OnDestroy {
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
        text: 'Dano COM Bônus - Alfa vs Ômega Strike',
        font: {
          size: 18,
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: '14000',
            xMax: '14000',
            borderColor: '#ff9900',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              display: true,
              content: ['Hunt Solo  ← | → Hunt Party'],
              position: 'start',
              backgroundColor: 'rgba(255, 153, 0, 0.8)',
              color: '#fff',
              font: {
                size: 10,
                weight: 'bold',
              },
              padding: 6,
            },
          },
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
          text: 'Dano Dado Com Bônus Ativo',
        },
        beginAtZero: true,
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

    this.lineChartData = {
      labels: data.map((d) => d.hp.toString()),
      datasets: [
        {
          data: data.map((d) => d.alfaBonusDamage),
          label: `Alfa Strike (${this.alfaBonus}%)`,
          borderColor: '#528e4e',
          backgroundColor: 'rgba(82, 142, 78, 0.1)',
          tension: 0.1,
        },
        {
          data: data.map((d) => d.omegaBonusDamage),
          label: `Ômega Strike (${this.omegaBonus}%)`,
          borderColor: '#8e2f2c',
          backgroundColor: 'rgba(142, 47, 44, 0.1)',
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
