@echo off
start cmd /k "cd eureka-server && mvn spring-boot:run"
start cmd /k "cd microservice-produtos && mvn spring-boot:run"
start cmd /k "cd microservice-pedidos && mvn spring-boot:run"
start cmd /k "cd api-gateway && mvn spring-boot:run"
start cmd /k "cd frontend && npm install && npm run dev"
