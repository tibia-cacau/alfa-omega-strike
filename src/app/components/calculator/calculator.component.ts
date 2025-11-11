import { Component, OnInit } from '@angular/core';

import { DamageCalculatorService } from '../../services/damage-calculator.service';
import { ServerLogParserService } from '../../services/server-log-parser.service';
import { SharedStateService } from '../../services/shared-state.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  baseDamage: number = 400;
  monsterHp: number = 10000;
  alfaBonus: number = 16.0;
  omegaBonus: number = 6.5;
  recommendation: string = '';
  alfaResult: { totalDamage: number; bonusDamage: number } | null = null;
  omegaResult: { totalDamage: number; bonusDamage: number } | null = null;

  // Server Log
  serverLog: string = '';
  showServerLog: boolean = false;
  parsedStats: any = null;

  constructor(
    private calculator: DamageCalculatorService,
    private logParser: ServerLogParserService,
    private sharedState: SharedStateService
  ) {}

  ngOnInit(): void {
    // Carregar estado inicial do serviço compartilhado
    const state = this.sharedState.getState();
    this.baseDamage = state.baseDamage;
    this.monsterHp = state.monsterHp;
    this.alfaBonus = state.alfaBonus;
    this.omegaBonus = state.omegaBonus;
    this.calculate();
  }

  calculate(): void {
    this.alfaResult = this.calculator.calculateAlfa(
      this.baseDamage,
      this.monsterHp,
      this.alfaBonus
    );
    this.omegaResult = this.calculator.calculateOmega(
      this.baseDamage,
      this.monsterHp,
      this.omegaBonus
    );
    this.recommendation = this.calculator.getRecommendation(
      this.baseDamage,
      this.monsterHp,
      this.alfaBonus,
      this.omegaBonus
    );
  }

  onInputChange(): void {
    // Validação básica
    if (this.baseDamage > 0 && this.monsterHp > 0) {
      // Atualizar estado compartilhado
      this.sharedState.updateState({
        baseDamage: this.baseDamage,
        monsterHp: this.monsterHp,
        alfaBonus: this.alfaBonus,
        omegaBonus: this.omegaBonus,
      });
      this.calculate();
    }
  }

  toggleServerLog(): void {
    this.showServerLog = !this.showServerLog;
  }

  parseServerLog(): void {
    if (!this.serverLog || this.serverLog.trim() === '') {
      this.parsedStats = null;
      return;
    }

    this.parsedStats = this.logParser.getDetailedStats(this.serverLog);

    if (this.parsedStats && this.parsedStats.average > 0) {
      this.baseDamage = this.parsedStats.average;
      // Atualizar estado compartilhado quando parsear o log
      this.sharedState.setBaseDamage(this.baseDamage);
      this.calculate();
    }
  }

  clearServerLog(): void {
    this.serverLog = '';
    this.parsedStats = null;
  }

  useAverageDamage(): void {
    if (this.parsedStats && this.parsedStats.average > 0) {
      this.baseDamage = this.parsedStats.average;
      // Atualizar estado compartilhado
      this.sharedState.setBaseDamage(this.baseDamage);
      this.calculate();
    }
  }
}
