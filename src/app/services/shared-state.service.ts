import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

export interface SharedCalculationState {
  baseDamage: number;
  monsterHp: number;
  alfaBonus: number;
  omegaBonus: number;
}

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  private stateSubject = new BehaviorSubject<SharedCalculationState>({
    baseDamage: 400,
    monsterHp: 10000,
    alfaBonus: 16.0,
    omegaBonus: 6.5,
  });

  public state$: Observable<SharedCalculationState> =
    this.stateSubject.asObservable();

  constructor() {}

  getState(): SharedCalculationState {
    return this.stateSubject.value;
  }

  updateState(updates: Partial<SharedCalculationState>): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...updates });
  }

  setBaseDamage(baseDamage: number): void {
    this.updateState({ baseDamage });
  }

  setMonsterHp(monsterHp: number): void {
    this.updateState({ monsterHp });
  }

  setAlfaBonus(alfaBonus: number): void {
    this.updateState({ alfaBonus });
  }

  setOmegaBonus(omegaBonus: number): void {
    this.updateState({ omegaBonus });
  }
}
