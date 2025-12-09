import { Injectable } from '@angular/core';

export interface ParsedDamage {
  damages: number[];
  average: number;
  total: number;
  count: number;
  excluded: number; // Quantidade de danos excluídos (charms)
}

@Injectable({
  providedIn: 'root',
})
export class ServerLogParserService {
  constructor() {}

  /**
   * Analisa o server log e extrai os danos causados pelo jogador
   * Exclui danos de charms (linhas que contém "charm" entre parênteses)
   */
  parseServerLog(serverLog: string): ParsedDamage {
    if (!serverLog || serverLog.trim() === '') {
      return {
        damages: [],
        average: 0,
        total: 0,
        count: 0,
        excluded: 0,
      };
    }

    const lines = serverLog.split('\n');
    const damages: number[] = [];
    let excludedCount = 0;

    // Regex para encontrar linhas de dano causado pelo jogador
    // Formato: "A <monster> loses <damage> hitpoints due to your attack."
    // ou "A <monster> loses <damage> hitpoints due to your critical attack."
    const damageRegex =
      /loses (\d+) hitpoints due to your (critical )?attack\./i;
    const charmRegex = /\(.*charm.*\)/i;

    for (const line of lines) {
      const match = line.match(damageRegex);

      if (match) {
        // Verifica se a linha contém referência a charm
        const hasCharm = charmRegex.test(line);

        if (hasCharm) {
          excludedCount++;
          continue; // Pula esta linha (dano de charm)
        }

        const damage = parseInt(match[1], 10);
        if (!isNaN(damage) && damage > 0) {
          damages.push(damage);
        }
      }
    }

    const total = damages.reduce((sum, dmg) => sum + dmg, 0);
    const average = damages.length > 0 ? Math.round(total / damages.length) : 0;

    return {
      damages,
      average,
      total,
      count: damages.length,
      excluded: excludedCount,
    };
  }

  /**
   * Valida se o texto parece ser um server log válido
   */
  isValidServerLog(serverLog: string): boolean {
    if (!serverLog || serverLog.trim() === '') {
      return false;
    }

    // Verifica se tem pelo menos uma linha com timestamp e dano
    const damageRegex =
      /\d{2}:\d{2}:\d{2}.*loses \d+ hitpoints due to your attack/i;
    return damageRegex.test(serverLog);
  }

  /**
   * Retorna estatísticas detalhadas do server log
   */
  getDetailedStats(serverLog: string) {
    const parsed = this.parseServerLog(serverLog);

    if (parsed.count === 0) {
      return null;
    }

    const sorted = [...parsed.damages].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const median =
      sorted.length % 2 === 0
        ? Math.round(
            (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
          )
        : sorted[Math.floor(sorted.length / 2)];

    // Conta critical hits
    const lines = serverLog.split('\n');
    let criticalCount = 0;
    for (const line of lines) {
      if (
        line.includes('due to your critical attack') &&
        !/\(.*charm.*\)/i.test(line)
      ) {
        criticalCount++;
      }
    }

    return {
      ...parsed,
      min,
      max,
      median,
      criticalHits: criticalCount,
      normalHits: parsed.count - criticalCount,
    };
  }
}
