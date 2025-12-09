import { Component, OnInit } from '@angular/core';
import {
  ExtraExpenses,
  HistoryEntry,
  HuntData,
} from './models/loot-split.types';

import { LootSplitService } from './services/loot-split.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  rawNewSession = '';
  isInvalid = false;
  huntData: HuntData = {};
  extraExpenses: ExtraExpenses = {};
  removedPlayers = new Set<string>();

  activeTab = 0; // 0 = Nova Sessão, 1 = Histórico
  historyList: HistoryEntry[] = [];
  selectedHistory: HistoryEntry | null = null;

  // Copy feedback
  copiedSummary = false;
  copiedTransfers: { [key: string]: boolean } = {};

  constructor(public lootSplitService: LootSplitService) {}

  ngOnInit() {
    this.rawNewSession = this.lootSplitService.getDefaultValue();
    this.loadHistory();
    this.calculateData();
  }

  onSessionChange(value: string) {
    this.rawNewSession = value;
    this.calculateData();
  }

  calculateData() {
    try {
      if (!this.rawNewSession.trim()) {
        this.isInvalid = true;
        this.huntData = {};
        return;
      }

      const displayedSession =
        this.activeTab === 1 && this.selectedHistory
          ? this.selectedHistory.rawData
          : this.rawNewSession;

      const displayedExtraExpenses =
        this.activeTab === 1 && this.selectedHistory
          ? this.selectedHistory.extraExpenses
          : this.extraExpenses;

      const displayedRemovedPlayers =
        this.activeTab === 1 && this.selectedHistory
          ? new Set(this.selectedHistory.removedPlayers)
          : this.removedPlayers;

      this.huntData = this.lootSplitService.calculateHuntData(
        displayedSession,
        displayedExtraExpenses,
        displayedRemovedPlayers
      );

      this.isInvalid = !this.huntData.transactions;
    } catch {
      this.isInvalid = true;
      this.huntData = {};
    }
  }

  get splittedBalance(): number {
    if (!this.huntData.teamReceipt || !this.huntData.playerReceipts) return 0;

    const displayedRemovedPlayers =
      this.activeTab === 1 && this.selectedHistory
        ? new Set(this.selectedHistory.removedPlayers)
        : this.removedPlayers;

    return Math.floor(
      this.huntData.teamReceipt.balance /
        (this.huntData.playerReceipts.length - displayedRemovedPlayers.size)
    );
  }

  get isWaste(): boolean {
    return this.huntData.teamReceipt
      ? this.huntData.teamReceipt.balance < 0
      : false;
  }

  saveToHistory() {
    if (this.isInvalid) return;

    const entry: HistoryEntry = {
      key: Date.now().toString(),
      timestamp: Date.now(),
      rawData: this.rawNewSession,
      extraExpenses: { ...this.extraExpenses },
      removedPlayers: [...this.removedPlayers],
    };

    this.historyList.unshift(entry);
    localStorage.setItem(
      'loot-split-history',
      JSON.stringify(this.historyList)
    );
  }

  loadHistory() {
    const stored = localStorage.getItem('loot-split-history');
    if (stored) {
      this.historyList = JSON.parse(stored);
    }
  }

  selectHistory(entry: HistoryEntry) {
    this.selectedHistory = entry;
    this.calculateData();
  }

  deleteHistory() {
    if (!this.selectedHistory) return;

    this.historyList = this.historyList.filter(
      (item) => item.key !== this.selectedHistory!.key
    );
    localStorage.setItem(
      'loot-split-history',
      JSON.stringify(this.historyList)
    );
    this.selectedHistory = null;
    this.calculateData();
  }

  onTabChange(index: number) {
    this.activeTab = index;
    if (index === 0) {
      this.selectedHistory = null;
    }
    this.calculateData();
  }

  onCopyText(event: {
    text: string;
    type: 'summary' | 'transfer';
    key?: string;
  }) {
    navigator.clipboard.writeText(event.text);

    if (event.type === 'summary') {
      this.copiedSummary = true;
      setTimeout(() => {
        this.copiedSummary = false;
      }, 2000);
    } else if (event.type === 'transfer' && event.key) {
      this.copiedTransfers[event.key] = true;
      setTimeout(() => {
        if (event.key) {
          this.copiedTransfers[event.key] = false;
        }
      }, 2000);
    }
  }
}
