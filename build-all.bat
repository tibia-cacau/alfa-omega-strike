@echo off
echo ================================================
echo    Buildando Tibia Cacau - Todos os Projetos
echo ================================================

echo.
echo [1/1] Limpando dist...
if exist dist rmdir /s /q dist

echo.
echo [2/2] Buildando Shell (com todos os módulos lazy-loaded)...
call ng build shell --configuration production --base-href=/

echo.
echo ================================================
echo    Build concluído! 
echo    Deploy em: dist\shell
echo ================================================
echo.
echo Estrutura (Shell com lazy loading):
echo   /                        → Shell principal
echo   /home                    → Landing/Home
echo   /alfa-vs-omega-strike    → Comparador (lazy)
echo   /calculators             → Calculadoras (lazy)
echo   /loot-split              → Divisão de Loot (lazy)
echo   /weekly-tasks            → Weekly Tasks (lazy)
echo.
echo Todos os módulos são carregados sob demanda pelo Shell!
echo.
