import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      route: '/home',
    },
    {
      id: 'alfa-vs-omega-strike',
      label: 'Alfa vs Omega Strike',
      icon: '⚔️',
      route: '/alfa-vs-omega-strike',
      children: [
        {
          id: 'calculator',
          label: 'Calculadora',
          icon: '🎯',
          route: '/alfa-vs-omega-strike',
        },
        {
          id: 'bonus-damage',
          label: 'Gráfico Dano Bônus',
          icon: '📊',
          route: '/alfa-vs-omega-strike/bonus-damage',
        },
        {
          id: 'bonus-diff',
          label: 'Gráfico Diferença',
          icon: '📈',
          route: '/alfa-vs-omega-strike/bonus-diff',
        },
      ],
    },
    {
      id: 'calculators',
      label: 'Calculadoras',
      icon: '🧮',
      route: '/calculators',
      children: [
        {
          id: 'exercise-weapons',
          label: 'Exercise Weapons',
          icon: '⚔️',
          route: '/calculators',
        },
        {
          id: 'imbuements',
          label: 'Imbuements Cost',
          icon: '✨',
          route: '/calculators/imbuements',
        },
      ],
    },
    {
      id: 'loot-split',
      label: 'Divisão de Loot',
      icon: '💰',
      route: '/loot-split',
    },
    {
      id: 'weekly-tasks',
      label: 'Tarefas Semanais',
      icon: '📋',
      route: '/weekly-tasks',
    },
  ];

  private menuItemsSubject = new BehaviorSubject<MenuItem[]>(this.menuItems);
  public menuItems$ = this.menuItemsSubject.asObservable();

  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  public sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  constructor() {}

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems$;
  }

  toggleSidebar(): void {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  openSidebar(): void {
    this.sidebarOpenSubject.next(true);
  }

  closeSidebar(): void {
    this.sidebarOpenSubject.next(false);
  }

  toggleMenuItem(itemId: string): void {
    this.menuItems = this.toggleItemRecursive(this.menuItems, itemId);
    this.menuItemsSubject.next([...this.menuItems]);
  }

  private toggleItemRecursive(items: MenuItem[], itemId: string): MenuItem[] {
    return items.map((item) => {
      if (item.id === itemId) {
        return { ...item, expanded: !item.expanded };
      }
      if (item.children) {
        return {
          ...item,
          children: this.toggleItemRecursive(item.children, itemId),
        };
      }
      return item;
    });
  }

  updateMenuItems(items: MenuItem[]): void {
    this.menuItems = items;
    this.menuItemsSubject.next([...this.menuItems]);
  }
}
