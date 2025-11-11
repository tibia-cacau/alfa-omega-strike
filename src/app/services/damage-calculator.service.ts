import { Injectable } from '@angular/core';

export interface DamageResult {
  totalDamage: number;
  bonusDamage: number;
}

export interface ComparisonData {
  hp: number;
  alfaTotalDamage: number;
  omegaTotalDamage: number;
  alfaBonusDamage: number;
  omegaBonusDamage: number;
  bonusDiffPercent: number;
}

@Injectable({
  providedIn: 'root',
})
export class DamageCalculatorService {
  private readonly HP_MIN = 2500;
  private readonly HP_MAX = 40000;
  private readonly HP_STEP = 500;

  constructor() {}

  /**
   * Calcula o dano total e dano com bônus para uma habilidade
   */
  private calculateDamage(
    baseDamage: number,
    monsterHp: number,
    bonusPercent: number,
    conditionCheck: (hpRatio: number) => boolean
  ): DamageResult {
    let currentHp = monsterHp;
    let totalDamage = 0;
    let bonusDamage = 0;
    let iterations = 0;
    const maxIterations = 10000;

    while (currentHp > 0 && iterations < maxIterations) {
      iterations++;
      const hpRatio = (currentHp / monsterHp) * 100;
      let dmg = baseDamage;

      if (conditionCheck(hpRatio)) {
        dmg *= 1 + bonusPercent / 100;
        bonusDamage += dmg;
      }

      totalDamage += dmg;
      currentHp -= dmg;
    }

    return { totalDamage, bonusDamage };
  }

  /**
   * Calcula os dados para Alfa Strike (bônus customizável quando HP > 95%)
   */
  calculateAlfa(
    baseDamage: number,
    monsterHp: number,
    alfaBonus: number = 16.0
  ): DamageResult {
    return this.calculateDamage(
      baseDamage,
      monsterHp,
      alfaBonus,
      (hpRatio) => hpRatio > 95
    );
  }

  /**
   * Calcula os dados para Omega Strike (bônus customizável quando HP < 30%)
   */
  calculateOmega(
    baseDamage: number,
    monsterHp: number,
    omegaBonus: number = 6.5
  ): DamageResult {
    return this.calculateDamage(
      baseDamage,
      monsterHp,
      omegaBonus,
      (hpRatio) => hpRatio < 30
    );
  }

  /**
   * Retorna a recomendação de qual habilidade usar
   */
  getRecommendation(
    baseDamage: number,
    monsterHp: number,
    alfaBonus: number = 16.0,
    omegaBonus: number = 6.5
  ): string {
    const alfa = this.calculateAlfa(baseDamage, monsterHp, alfaBonus);
    const omega = this.calculateOmega(baseDamage, monsterHp, omegaBonus);

    const bonusDiff =
      ((omega.bonusDamage - alfa.bonusDamage) / omega.bonusDamage) * 100;

    if (Math.abs(bonusDiff) < 1) {
      return 'EMPATE - Ambas são equivalentes';
    } else if (bonusDiff > 0) {
      return `ÔMEGA STRIKE - ${bonusDiff.toFixed(1)}% mais dano com bônus`;
    } else {
      return `ALFA STRIKE - ${Math.abs(bonusDiff).toFixed(
        1
      )}% mais dano com bônus`;
    }
  }

  /**
   * Gera os dados completos para os gráficos
   */
  generateChartData(
    baseDamage: number,
    alfaBonus: number = 16.0,
    omegaBonus: number = 6.5
  ): ComparisonData[] {
    const data: ComparisonData[] = [];

    for (let hp = this.HP_MIN; hp <= this.HP_MAX; hp += this.HP_STEP) {
      const alfa = this.calculateAlfa(baseDamage, hp, alfaBonus);
      const omega = this.calculateOmega(baseDamage, hp, omegaBonus);

      const bonusDiffPercent =
        omega.bonusDamage === 0
          ? 0
          : ((omega.bonusDamage - alfa.bonusDamage) / omega.bonusDamage) * 100;

      data.push({
        hp,
        alfaTotalDamage: alfa.totalDamage,
        omegaTotalDamage: omega.totalDamage,
        alfaBonusDamage: alfa.bonusDamage,
        omegaBonusDamage: omega.bonusDamage,
        bonusDiffPercent,
      });
    }

    return data;
  }
}
