# Tibia Cacau - Ferramentas

Monorepo com múltiplos projetos relacionados ao jogo Tibia, deployados em um único site.

## 🚀 Deploy Unificado

Este workspace contém 3 aplicações que são deployadas juntas:

1. **Landing Page** (`/`) - Menu principal com links para todas as ferramentas
2. **Comparador Alfa vs Omega Strike** (`/comparador`) - Análise de dano de magias
3. **Weekly Tasks Recommendation** (`/weekly-tasks`) - Sistema de recomendação de tarefas

## 📦 Build e Deploy

### Build Completo (Todos os Projetos)

```bash
# Windows
build-all.bat

# Resultado em: dist/deploy/
```

Estrutura gerada:
```
dist/deploy/
├── index.html              # Landing page (raiz)
├── comparador/             # Alfa vs Omega Strike
│   └── index.html
└── weekly-tasks/           # Weekly Tasks
    └── index.html
```

### Deploy no KingHost

1. Build todos os projetos: `build-all.bat`
2. Upload da pasta `dist/deploy/*` via FTP para `/home/tibiacacau/www/`
3. Acessar: `https://tibiacacau.com.br`

---

## Projetos

### 1. Landing Page (Menu Principal)

Landing page moderna com cards para navegar entre os aplicativos.

**Localização:** `projects/landing/`

---

### 2. Comparador Alfa vs Omega Strike (Angular)

Aplicação Angular para comparar dano das proficiencies Alfa Strike vs Omega Strike.

**Features:**
- 3 abas com Angular Material
- Calculadora com parser de server log
- Gráfico de comparação de dano bônus (Chart.js)
- Gráfico de diferença percentual
- Sincronização de estado entre abas (RxJS)
- Análise de cenários e recomendações
- Linha de separação em 14k HP (Hunt Solo vs Hunt Party)

**Demo:** https://tibia-cacau.github.io/alfa-omega-strike/

**Localização:** `projects/comparador/`

---

### 2. Weekly Tasks Recommendation (Angular + Spring Boot)

Sistema para gerenciar e recomendar Weekly Tasks do Tibia.

#### Frontend (Angular)
- Interface para visualizar tasks semanais
- Sistema de recomendação baseado em nível e vocação
- Filtros por dificuldade, tempo estimado e tipo de task

**Localização:** `projects/weekly-tasks/`

#### Backend (Spring Boot + MongoDB)
- API RESTful para gerenciar tasks
- Sistema de recomendação inteligente
- Armazenamento de tasks (entrega de itens e morte de monstros)
- Endpoints para CRUD e recomendações personalizadas

**Localização:** `weekly-tasks-backend/`

**Tecnologias:**
- Java 17
- Spring Boot 3.2.0
- MongoDB
- Maven

## Estrutura

```
tibia-cacau/
├─ projects/
│  ├─ comparador/              # Comparador Alfa vs Omega Strike (Angular)
│  └─ weekly-tasks/            # Weekly Tasks Frontend (Angular)
├─ weekly-tasks-backend/       # Weekly Tasks Backend (Spring Boot)
│  ├─ src/main/java/
│  │  └─ com/tibia/weeklytasks/
│  │     ├─ controller/
│  │     ├─ service/
│  │     ├─ repository/
│  │     ├─ model/
│  │     └─ dto/
│  └─ pom.xml
├─ angular.json
├─ package.json
└─ README.md
```

## Desenvolvimento

### Frontend (Angular)

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Servir aplicação comparador
npm start

# Servir aplicação weekly-tasks
ng serve weekly-tasks

# Build produção

npm run build

# Deploy GitHub Pages (comparador)
npm run deploy
```

### Backend (Spring Boot)

```bash
# Navegar para o diretório do backend
cd weekly-tasks-backend

# Executar aplicação
mvn spring-boot:run

# Build
mvn clean package

# Executar jar
java -jar target/weekly-tasks-backend-1.0.0.jar
```

**Pré-requisitos para o backend:**
- Java 17+
- Maven 3.6+
- MongoDB rodando em `localhost:27017`

## Tecnologias

### Frontend
- Angular 16.2
- TypeScript
- Chart.js + ng2-charts
- Angular Material
- RxJS
- SCSS

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data MongoDB
- Lombok
- Maven
