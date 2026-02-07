import { Component } from '@angular/core';
import { TabItem } from '../../../../shared-components/tibia-tabs/tibia-tabs.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	tabs: TabItem[] = [
		{ label: 'Calculadora', route: './', icon: '🎯', exact: true },
		{ label: 'Gráfico Dano Bônus', route: './bonus-damage', icon: '📊' },
		{ label: 'Gráfico Diferença', route: './bonus-diff', icon: '📈' },
	];
}
