import { Component, EventEmitter, Input, Output } from '@angular/core';

import { HuntData } from '../../models/loot-split.types';

@Component({
  selector: 'app-session-summary',
  templateUrl: './session-summary.component.html',
  styleUrls: ['./session-summary.component.scss'],
})
export class SessionSummaryComponent {
  @Input() huntData: HuntData = {};
  @Input() splittedBalance = 0;
  @Input() isWaste = false;
  @Input() activeTab = 0;
  @Input() selectedHistory: any = null;
  @Input() isInvalid = false;
  @Input() copiedSummary = false;
  @Input() copiedTransfers: { [key: string]: boolean } = {};

  @Output() copyText = new EventEmitter<{
    text: string;
    type: 'summary' | 'transfer';
    key?: string;
  }>();
  @Output() deleteHistory = new EventEmitter<void>();
  @Output() saveToHistory = new EventEmitter<void>();

  Math = Math;

  formatNumber(num: number): string {
    return num.toLocaleString('pt-BR');
  }

  formatTimestamp(timestamp?: number): string {
    if (!timestamp) return 'Nenhum';
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  onCopy(text: string, type: 'summary' | 'transfer' = 'summary', key?: string) {
    this.copyText.emit({ text, type, key });
  }

  getCopyText(): string {
    if (!this.huntData.transactions || !this.huntData.teamReceipt) return '';

    let text = `📊 Divisão de Loot - ${this.formatTimestamp(
      this.huntData.timestamp
    )}\n\n`;
    text += `💰 Total: ${this.formatNumber(
      this.huntData.teamReceipt.balance
    )} gp\n`;
    text += `👥 Por pessoa: ${this.formatNumber(this.splittedBalance)} gp\n\n`;
    text += `🔄 Transferências:\n`;
    this.huntData.transactions.forEach((t) => {
      text += `${t.from} → ${t.to}: ${this.formatNumber(t.amount)} gp\n`;
    });

    return text;
  }
}
