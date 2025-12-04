# Tibia Cacau Workspace

Monorepo Angular contendo projetos relacionados ao jogo Tibia.

## Projetos

### Comparador Alfa vs Omega Strike

Aplicação Angular para comparar dano das proficiencies Alfa Strike vs Omega Strike no Tibia.

**Features:**
- 3 abas com Angular Material
- Calculadora com parser de server log
- Gráfico de comparação de dano bônus (Chart.js)
- Gráfico de diferença percentual
- Sincronização de estado entre abas (RxJS)
- Análise de cenários e recomendações
- Linha de separação em 14k HP (Hunt Solo vs Hunt Party)

**Demo:** https://tibia-cacau.github.io/alfa-omega-strike/

## Estrutura

```
tibia-cacau/
 projects/
    comparador/          # Comparador Alfa vs Omega Strike
        src/
           app/
              components/
              services/
              ...
           ...
        tsconfig.app.json
        tsconfig.spec.json
 angular.json
 package.json
 README.md
```

## Desenvolvimento

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Servir aplicação comparador
npm start

# Build produção
npm run build

# Deploy GitHub Pages
npm run deploy
```

## Tecnologias

- Angular 16.2
- TypeScript
- Chart.js + ng2-charts
- Angular Material
- RxJS
- SCSS
