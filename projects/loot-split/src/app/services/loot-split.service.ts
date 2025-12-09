import {
  ExtraExpenses,
  HuntData,
  Receipt,
  Transaction,
} from '../models/loot-split.types';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LootSplitService {
  private breakLines(text: string): string[] {
    return text.split('\n');
  }

  private sanitizeName(name: string): string {
    return name.replace(' (Leader)', '');
  }

  private sanitizeValueLine(line: string): number {
    const [, value] = line.split(':');
    return +value.trim().replace(/,/g, '');
  }

  private parseReceipt([name, ...valueLines]: string[]): Receipt {
    const [loot, supplies, balance] = valueLines.map((line) =>
      this.sanitizeValueLine(line)
    );
    return { name: this.sanitizeName(name), loot, supplies, balance };
  }

  parseSessionTimestamp(text: string): number {
    const [rawTimestamps] = this.breakLines(text).slice(0, 2);
    const [dirtyFrom] = rawTimestamps.split(' to ');
    const [, from] = dirtyFrom.split('From ');
    return +new Date(from);
  }

  parsePlayerReceipts(text: string): Receipt[] {
    const lines = this.breakLines(text);
    const playerLines = lines.slice(6);

    const receipts: Receipt[] = [];
    while (playerLines.length > 0) {
      receipts.push(this.parseReceipt(playerLines.splice(0, 6)));
    }

    return receipts;
  }

  private normalizeDustAmount(value: number): number {
    return Math.max(0, Math.floor(value));
  }

  private findTransactionsRequired(receipts: Receipt[]): Transaction[] {
    const sortedReceipts = [...receipts].sort((a, b) => b.balance - a.balance);

    const teamBalance = sortedReceipts.reduce(
      (acc, { balance }) => acc + balance,
      0
    );
    const teamSize = sortedReceipts.length;
    const fairBalance = teamBalance / teamSize;

    const ledger: ExtraExpenses = {};
    sortedReceipts.forEach(({ name }) => {
      ledger[name] = 0;
    });

    const playerShould = {
      transfer: ({ name, balance }: Receipt): number =>
        this.normalizeDustAmount(balance + ledger[name] - fairBalance),
      receive: ({ name, balance }: Receipt): number =>
        this.normalizeDustAmount(fairBalance - (balance + ledger[name])),
    };

    const transactions: Transaction[] = [];
    const transfer = ({ from, to, amount }: Transaction) => {
      ledger[from] -= amount;
      ledger[to] += amount;
      transactions.push({ from, to, amount });
    };

    sortedReceipts.forEach((from) => {
      sortedReceipts.forEach((to) => {
        if (from.name === to.name) return;

        const maxTransferAmount = playerShould.transfer(from);
        const maxReceiveAmount = playerShould.receive(to);

        const amount = Math.round(
          Math.min(maxTransferAmount, maxReceiveAmount)
        );
        if (amount) {
          transfer({
            from: from.name,
            to: to.name,
            amount,
          });
        }
      });
    });

    return transactions;
  }

  calculateHuntData(
    session: string,
    extraExpenses: ExtraExpenses,
    removedPlayers: Set<string>
  ): HuntData {
    try {
      const playerReceipts = this.parsePlayerReceipts(session).map(
        ({ supplies, balance, ...rest }) => {
          const extraCost = extraExpenses[rest.name] ?? 0;

          return {
            ...rest,
            supplies: supplies + extraCost,
            balance: balance - extraCost,
          };
        }
      );

      const filteredPlayerReceipts = playerReceipts.filter(
        ({ name }) => !removedPlayers.has(name)
      );

      return {
        teamReceipt: filteredPlayerReceipts.reduce((acc, player) => ({
          name: 'Team',
          loot: acc.loot + player.loot,
          supplies: acc.supplies + player.supplies,
          balance: acc.balance + player.balance,
        })),
        playerReceipts,
        transactions: this.findTransactionsRequired(filteredPlayerReceipts),
        timestamp: this.parseSessionTimestamp(session),
        players: playerReceipts.map(({ name }) => name),
      };
    } catch {
      return {};
    }
  }

  getDefaultValue(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateStr = `${year}-${month}-${day}`;

    return `Session data: From ${dateStr}, 11:21:07 to ${dateStr}, 13:44:36
Session: 01:23h
Loot Type: Market
Loot: 624,317
Supplies: 566,829
Balance: 57488
Lord'Paulistinha (Leader)
\tLoot: 349,363
\tSupplies: 98,318
\tBalance: 251,045
\tDamage: 215,683
\tHealing: 117,408
Mateusz Dragon Wielki
\tLoot: 205,479
\tSupplies: 123,737
\tBalance: 81,742
\tDamage: 885,460
\tHealing: 332,423
Cachero
\tLoot: 46,904
\tSupplies: 174,424
\tBalance: -127,520
\tDamage: 628,303
\tHealing: 223
Lightbringer
\tLoot: 22,571
\tSupplies: 170,350
\tBalance: -147,779
\tDamage: 564,848
\tHealing: 104,877`;
  }
}
