import { Component, EventEmitter, Input, Output } from '@angular/core';

import { HistoryEntry } from '../../models/loot-split.types';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent {
  @Input() historyList: HistoryEntry[] = [];
  @Input() selectedHistory: HistoryEntry | null = null;
  @Output() selectHistory = new EventEmitter<HistoryEntry>();

  onSelectHistory(item: HistoryEntry) {
    this.selectHistory.emit(item);
  }

  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
