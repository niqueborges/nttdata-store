@echo off
echo ===============================
echo Encerrando todos os microservices...
echo ===============================

rem Fecha qualquer janela de CMD que esteja rodando "mvn spring-boot:run"
taskkill /F /FI "WINDOWTITLE eq C:\WINDOWS\system32\cmd.exe - mvn spring-boot:run" >nul 2>&1

rem Fecha processos Java (Spring Boot)
taskkill /F /IM java.exe >nul 2>&1
taskkill /F /IM javaw.exe >nul 2>&1

echo Todos os microservices foram encerrados.
timeout /t 10
