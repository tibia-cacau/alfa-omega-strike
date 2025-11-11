# Comparador Alfa vs Ômega Strike ⚔️

[![GitHub Pages](https://img.shields.io/badge/demo-live-success)](https://tibia-cacau.github.io/alfa-omega-strike/)
[![Angular](https://img.shields.io/badge/Angular-17+-red)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)

Aplicação web interativa para comparar a efetividade entre **Alfa Strike** e **Ômega Strike** no jogo Tibia, com gráficos dinâmicos, bônus customizáveis e parser de server log.

## 🎮 [Demo ao Vivo](https://tibia-cacau.github.io/alfa-omega-strike/)

## 📊 Funcionalidades

### 🎯 Calculadora Interativa
- ✅ Entrada de dano médio do personagem
- ✅ Entrada de HP do monstro
- ✅ **Bônus customizáveis** para Alfa (padrão: 16%) e Ômega (padrão: 6.5%)
- ✅ Recomendação visual com ícones do Tibia
- ✅ Estatísticas detalhadas de dano total e dano com bônus

### 📈 Gráficos Interativos (Chart.js)
1. **Gráfico de Dano com Bônus**: Compara quanto dano foi dado enquanto o bônus estava ativo
   - Linha verde: Alfa Strike
   - Linha vermelha: Ômega Strike
   
2. **Gráfico de Diferença Percentual**: Mostra qual é melhor em cada faixa de HP
   - Verde: Alfa é melhor (valores negativos)
   - Vermelho: Ômega é melhor (valores positivos)

### 📝 Parser de Server Log
- ✅ Cola o server log do Tibia e extrai automaticamente os danos
- ✅ **Exclui automaticamente danos de charms**
- ✅ Calcula média, mediana, mínimo, máximo
- ✅ Identifica critical hits vs hits normais
- ✅ Mostra quantidade de hits excluídos (charms)

## 🎨 Visual

- **Cores temáticas do Tibia**: Verde (#528e4e) para Alfa, Vermelho (#8e2f2c) para Ômega
- **Molduras douradas** nos ícones (estilo Tibia Wiki)
- **Interface responsiva** (mobile-friendly)
- **Gradientes e animações** suaves

## 🛠️ Tecnologias

- **Angular 17+**: Framework principal
- **TypeScript**: Linguagem de programação
- **Chart.js + ng2-charts**: Gráficos interativos
- **SCSS**: Estilização avançada
- **Angular Router**: Navegação entre abas

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/tibia-cacau/alfa-omega-strike.git
cd alfa-omega-strike

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm start
```

Acesse `http://localhost:4200/` no navegador.

## 🔧 Build de Produção

```bash
# Build otimizado
ng build --configuration production

# Publicar no GitHub Pages
npx angular-cli-ghpages --dir=dist/comparador
```

## 📐 Como Funciona

### Cálculo de Dano

#### Alfa Strike
- **Bônus**: Customizável (padrão: 16%)
- **Condição**: HP do monstro > 95%
- **Estratégia**: Maximiza dano no início do combate

#### Ômega Strike
- **Bônus**: Customizável (padrão: 6.5%)
- **Condição**: HP do monstro < 30%
- **Estratégia**: Maximiza dano no final do combate

### Fórmula de Diferença

```
Diferença % = ((Ômega Bonus - Alfa Bonus) / Ômega Bonus) × 100
```

- **Positivo**: Ômega deu mais dano
- **Negativo**: Alfa deu mais dano
- **Próximo de zero**: Empate

## 🎯 Casos de Uso

- **PvE**: Determinar qual proficiency usar em cada tipo de criatura
- **Hunting**: Otimizar damage output baseado no HP médio dos monstros
- **Análise**: Visualizar graficamente as diferenças em diferentes cenários
- **Log Analysis**: Validar dano real do server log antes de tomar decisões

## 📱 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── calculator/          # Calculadora principal
│   │   ├── bonus-damage-chart/  # Gráfico de dano com bônus
│   │   └── bonus-diff-chart/    # Gráfico de diferença %
│   ├── services/
│   │   ├── damage-calculator.service.ts    # Lógica de cálculo
│   │   └── server-log-parser.service.ts    # Parser de logs
│   └── assets/
│       └── images/              # Ícones do Tibia
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- 🐛 Reportar bugs
- 💡 Sugerir novas funcionalidades
- 🔧 Enviar pull requests

## 📄 Licença

Este projeto é open source e está disponível para uso livre.

## 🎮 Sobre Tibia

[Tibia](https://www.tibia.com/) é um MMORPG 2D criado pela CipSoft. Este projeto não é afiliado à CipSoft GmbH.

---

Desenvolvido com ❤️ para a comunidade Tibia
