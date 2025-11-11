import {
  ComparisonData,
  DamageCalculatorService,
} from '../../services/damage-calculator.service';
import { Component, OnInit } from '@angular/core';

import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bonus-damage-chart',
  templateUrl: './bonus-damage-chart.component.html',
  styleUrls: ['./bonus-damage-chart.component.scss'],
})
export class BonusDamageChartComponent implements OnInit {
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

  constructor(private calculator: DamageCalculatorService) {}

  ngOnInit(): void {
    this.updateChart();
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
      this.updateChart();
    }
  }

  onBonusChange(): void {
    this.updateChart();
  }
}
