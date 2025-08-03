# NTTData Store com a DIO.me

## Sistema de Gerenciamento de Pedidos e Produtos

<div align="center">
  <img src="https://img.shields.io/badge/Java-17-blue" alt="Java 17">
  <img src="https://img.shields.io/badge/Spring_Boot-3.0-green" alt="Spring Boot 3.0">
  <img src="https://img.shields.io/badge/React-18-blueviolet" alt="React 18">
  <img src="https://img.shields.io/badge/Bootstrap-5-purple" alt="Bootstrap 5">
</div>

-----

## 📄 Sobre o Projeto

Este é um sistema completo de gerenciamento de pedidos e produtos, desenvolvido com uma arquitetura de microserviços. A solução integra um **backend robusto em Java com Spring Boot** e um **frontend dinâmico em React e Bootstrap**. A comunicação entre os serviços é gerenciada por componentes essenciais como **Eureka Service Discovery**, **API Gateway** e **OpenFeign**.

## 🚀 Arquitetura e Funcionalidades

O projeto é dividido nos seguintes componentes principais:

### Backend (Java Spring Boot)

* **`microservice-pedidos`**: Gerencia o ciclo de vida dos pedidos.
    * Criação de pedidos com cliente, produto e quantidade.
    * Listagem de pedidos (simples e detalhada).
    * Comunicação com o `microservice-produtos` via **OpenFeign** para buscar dados completos dos produtos.
* **`microservice-produtos`**: Gerencia o catálogo de produtos.
    * Cadastro e listagem de produtos.
* **`eureka-server`**: Um servidor de registro e descoberta de serviços. Permite que os microserviços se encontrem e se comuniquem.
* **`api-gateway`**: Atua como o ponto de entrada único para todos os microserviços, centralizando as requisições do frontend.

> **Banco de Dados:** Ambos os microserviços utilizam um banco de dados **H2 em memória**, ideal para desenvolvimento e testes. O `microservice-produtos` é inicializado com dados pré-carregados via `data.sql`.

### Frontend (React)

* **`frontend`**: Uma interface de usuário completa construída com **React e Bootstrap**.
    * Consome a API através do `api-gateway`.
    * Funcionalidades de listagem de produtos, listagem e criação de pedidos.
    * Simulação de login para cliente e administrador.

-----

### Diagrama de Arquitetura

-----

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

Certifique-se de que você tem as seguintes ferramentas instaladas:

* **Java 17**
* **Maven 3.8+**
* **Node.js 18+**
* **NPM** ou **Yarn**
* **Postman** (recomendado para testes de API)

### Execução Completa

Para iniciar todos os serviços (backend e frontend) de uma só vez, utilize o script na raiz do projeto:

| Sistema Operacional | Comando |
| :--- | :--- |
| **Windows** | `start-all.bat` |
| **Linux/Mac** | `./start-all.sh` (você pode precisar dar permissão de execução com `chmod +x start-all.sh`) |

Este comando irá iniciar 5 terminais, um para cada serviço (Eureka Server, Microservice-Produtos, Microservice-Pedidos, API Gateway e Frontend React).

-----

## 📦 Endpoints da API

O frontend interage com todos os endpoints através do **API Gateway**.

| Componente | Método | URL | Descrição |
| :--- | :--- | :--- | :--- |
| **`produtos`** | `GET` | `/produtos` | Lista todos os produtos |
| **`produtos`** | `POST` | `/produtos` | Cria um novo produto |
| **`pedidos`** | `POST` | `/pedidos` | Cria um novo pedido |
| **`pedidos`** | `GET` | `/pedidos` | Lista todos os pedidos |
| **`pedidos`** | `GET` | `/pedidos/detalhes` | Lista pedidos com detalhes dos produtos |
| **`pedidos`** | `POST` | `/pedidos/detalhes` | Lista pedidos com filtros via body |
| **`pedidos`** | `GET` | `/pedidos/{id}` | Busca um pedido pelo ID |

-----

## 🧪 Testando a API com Postman

Uma **Collection do Postman** está incluída para facilitar o teste de todos os endpoints.

1.  Abra o Postman.
2.  Clique em **"Import"**.
3.  Selecione o arquivo `nttdata-store.postman_collection.json` na pasta `postman/`.

Todos os endpoints estarão configurados e prontos para uso.

-----

## 📂 Estrutura do Projeto

```
nttdata-store/
├── api-gateway/
├── docs/
│   └── arquitetura_nttdata_store.png
├── eureka-server/
├── microservice-pedidos/
├── microservice-produtos/
├── frontend/
├── postman/
│   └── nttdata-store.postman_collection.json
├── start-all.bat
├── start-all.sh
├── .gitignore
├── LICENSE
└── README.md
```

-----

## 📝 Autor

**Monique Borges** [GitHub](https://github.com/niqueborges)

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.