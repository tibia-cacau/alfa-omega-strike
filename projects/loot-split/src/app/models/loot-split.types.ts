export interface Receipt {
  name: string;
  loot: number;
  supplies: number;
  balance: number;
}

export interface Transaction {
  from: string;
  to: string;
  amount: number;
}

export interface ExtraExpenses {
  [playerName: string]: number;
}

export interface HistoryEntry {
  key: string;
  timestamp: number;
  rawData: string;
  extraExpenses: ExtraExpenses;
  removedPlayers: string[];
}

export interface HuntData {
  timestamp?: number;
  teamReceipt?: Receipt;
  playerReceipts?: Receipt[];
  transactions?: Transaction[];
  players?: string[];
}
