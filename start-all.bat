@echo off
setlocal enabledelayedexpansion

rem ===============================
rem Detecta se está no IntelliJ
rem ===============================
set "TERM_MODE=multi"

rem IntelliJ usa um terminal que não suporta "start cmd /k"
rem Vamos detectar pelo nome do executável pai
for /f "tokens=2 delims==" %%a in ('wmic process where "ProcessId=%PPID%" get Name /value 2^>nul') do (
    set "PARENT=%%a"
)

if /i "%PARENT%"=="idea64.exe" (
    set "TERM_MODE=single"
)

echo ===============================
echo Iniciando todos os microservices...
echo Modo: %TERM_MODE%
echo ===============================

if "%TERM_MODE%"=="multi" (
    rem Modo com múltiplas janelas (CMD normal)
    start cmd /k "cd eureka-server && mvn spring-boot:run"
    timeout /t 20 /nobreak >nul

    start cmd /k "cd microservice-produtos && mvn spring-boot:run"
    timeout /t 30 /nobreak >nul

    start cmd /k "cd microservice-pedidos && mvn spring-boot:run"
    timeout /t 40 /nobreak >nul

    start cmd /k "cd microservice-ia && mvn spring-boot:run"
    timeout /t 50 /nobreak >nul

    start cmd /k "cd api-gateway && mvn spring-boot:run"
        timeout /t 60 /nobreak >nul
) else (
    rem Modo sequencial (IntelliJ)
    cd eureka-server && mvn spring-boot:run & cd ..
    cd microservice-produtos && mvn spring-boot:run & cd ..
    cd microservice-pedidos && mvn spring-boot:run & cd ..
    cd microservice-ia && mvn spring-boot:run & cd ..
    cd api-gateway && mvn spring-boot:run & cd ..
)

start cmd /k "cd frontend && npm run dev"

echo Todos os serviços foram iniciados.
timeout /t 10


