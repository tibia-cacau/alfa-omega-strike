import { Component, OnInit } from '@angular/core';

import { AppCard } from '../../models/app-card.model';

const APP_CARDS: AppCard[] = [
  {
    icon: 'assets/images/goldCoin.gif',
    title: 'Divisão de Loot',
    description:
      'Calcule automaticamente a divisão justa de loot entre os players da party com histórico de sessões',
    route: '/loot-split',
    buttonText: 'Acessar Loot Split',
  },
  {
    icon: 'assets/images/Weekly_Tasks_Banner.png',
    title: 'Weekly Tasks',
    description:
      'Sistema completo de recomendação de tarefas semanais do Tibia com busca de itens',
    route: '/weekly-tasks',
    buttonText: 'Acessar Weekly Tasks',
  },
  {
    icon: 'assets/images/lastingSword.gif',
    title: 'Calculadoras',
    description:
      'Ferramentas de cálculo para Exercise Weapons e custos de Imbuements',
    route: '/calculators',
    buttonText: 'Acessar Calculadoras',
  },
  {
    icon: 'assets/images/Proficiency_Type_Omega_Dmg.gif',
    title: 'Alfa vs Omega Strike',
    description:
      'Compare o dano bônus entre as magias Alfa e Omega Strike com gráficos interativos',
    route: '/alfa-vs-omega-strike',
    buttonText: 'Acessar Comparador',
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  appCards: AppCard[] = [];

  ngOnInit(): void {
    this.appCards = APP_CARDS;
  }
}
