# Deploy para KingHost - Manual Completo

## 📦 Arquivos gerados para deploy

### Backend
- `weekly-tasks-backend-1.0.0.jar` - Aplicação Spring Boot compilada
- `start.sh` - Script para iniciar aplicação no servidor
- `stop.sh` - Script para parar aplicação
- `.htaccess` - Configuração Apache para proxy API

## 🚀 Passo a Passo - Deploy Backend

### 1. Conectar via SSH ao KingHost
```bash
ssh tibiacacau@web135.kinghost.net
```

### 2. Criar diretório para aplicação Java
```bash
cd /home/tibiacacau/www
mkdir -p java-app
cd java-app
```

### 3. Upload dos arquivos (via FTP ou SCP)

**Opção A: FTP (FileZilla ou similar)**
- Host: `ftp.tibiacacau.com.br`
- Usuário: `tibiacacau`
- Senha: (sua senha do painel)
- Destino: `/home/tibiacacau/www/java-app/`
- Arquivos:
  - `weekly-tasks-backend-1.0.0.jar`
  - `start.sh`
  - `stop.sh`

**Opção B: SCP (linha de comando)**
```bash
# Do seu computador Windows (PowerShell):
scp C:\Users\grodr\Desktop\tibia-cacau\weekly-tasks-backend\target\weekly-tasks-backend-1.0.0.jar tibiacacau@web135.kinghost.net:/home/tibiacacau/www/java-app/
scp C:\Users\grodr\Desktop\tibia-cacau\weekly-tasks-backend\start.sh tibiacacau@web135.kinghost.net:/home/tibiacacau/www/java-app/
scp C:\Users\grodr\Desktop\tibia-cacau\weekly-tasks-backend\stop.sh tibiacacau@web135.kinghost.net:/home/tibiacacau/www/java-app/
```

### 4. No servidor SSH, dar permissão de execução
```bash
cd /home/tibiacacau/www/java-app
chmod +x start.sh stop.sh
```

### 5. Iniciar aplicação
```bash
./start.sh
```

Você verá:
```
Application started with PID: 12345
Log file: application.log
```

### 6. Verificar se está rodando
```bash
# Ver logs em tempo real
tail -f application.log

# Verificar processo
ps aux | grep java

# Testar API localmente no servidor
curl http://localhost:8080/api/items
```

## 🌐 Deploy Frontend + Configuração Proxy

### 1. Build do frontend (no seu computador)
```powershell
cd C:\Users\grodr\Desktop\tibia-cacau
.\build-all.bat
```

### 2. Upload da pasta dist/deploy
- Via FTP para `/home/tibiacacau/www/`
- Isso coloca os arquivos na raiz do domínio

### 3. Upload do .htaccess
- Copiar `.htaccess` para `/home/tibiacacau/www/.htaccess`
- Isso configura o proxy para `/api/*` → `http://localhost:8080/api/*`

## ✅ Testes de Produção

### Backend
```bash
# Do servidor SSH:
curl http://localhost:8080/api/items?page=0&size=10

# Do seu navegador:
http://tibiacacau.com.br/api/items?page=0&size=10
```

### Frontend
```
http://tibiacacau.com.br/weekly-tasks
http://tibiacacau.com.br/comparador
```

## 🔧 Comandos Úteis

### Parar aplicação
```bash
cd /home/tibiacacau/www/java-app
./stop.sh
```

### Reiniciar aplicação
```bash
./stop.sh
./start.sh
```

### Ver logs
```bash
tail -f application.log           # Tempo real
cat application.log                # Tudo
grep ERROR application.log         # Apenas erros
```

### Verificar banco de dados
```bash
mysql -h mysql50-farm1.kinghost.net -u tibiacacau -p tibiacacau
# Senha: tibiacacau123

# No prompt MySQL:
USE tibiacacau;
SHOW TABLES;
SELECT COUNT(*) FROM items;
SELECT * FROM items LIMIT 5;
```

## 🔒 Variáveis de Ambiente

O `start.sh` já configura:
- `DATASOURCE_URL`: jdbc:mysql://mysql50-farm1.kinghost.net:3306/tibiacacau
- `DATASOURCE_USERNAME`: tibiacacau
- `DATASOURCE_PASSWORD`: tibiacacau123
- `PORT`: 8080
- `CORS_ALLOWED_ORIGINS`: dominios permitidos

## ⚠️ Troubleshooting

### Porta 8080 já em uso
```bash
# Encontrar processo na porta 8080
lsof -i :8080
netstat -tulpn | grep 8080

# Matar processo
kill -9 [PID]
```

### Aplicação não conecta ao MySQL
- Verificar firewall: ping mysql50-farm1.kinghost.net
- Testar conexão: `telnet mysql50-farm1.kinghost.net 3306`
- Verificar credenciais no painel KingHost

### API retorna 502/503
- Verificar se Java app está rodando: `ps aux | grep java`
- Verificar logs: `tail -f application.log`
- Verificar .htaccess: `cat /home/tibiacacau/www/.htaccess`

### Upload de arquivo falha
- Verificar limite no Apache: `client_max_body_size` ou `upload_max_filesize`
- Verificar logs do Spring: grep "MaxUploadSizeExceededException" application.log

## 📊 Status Atual

✅ Banco MySQL criado e configurado
✅ 450 items importados com sucesso
✅ Backend compilado (1.0.0.jar)
✅ Scripts de deploy prontos
✅ Frontend buildado

🔄 Próximo passo: **Upload para servidor KingHost**
