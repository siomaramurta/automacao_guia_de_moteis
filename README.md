# Case Guia de Motéis - Testes de Qualidade

Este repositório contém os testes realizados para avaliação de QA.

## 📂 Estrutura do Repositório
- `api/` → API construída para os testes utilizando JSON Server
- `testes_cypress/` → Testes de interface com Cypress
- `testes_performance/` → Testes de performance usando JMeter
- `testes_api_postman/` → Testes de API exportados do Postman

## 🚀 Testes

Para rodar os testes em sua máquina e poder rodar a API, clone o repositório deste projeto.

### 1.API

Uma API mockada foi criada utilizando o JSON Server, simulando o cadastro e consulta de usuários. A API foi construída utilizando JavaScript (Node.js), de forma modular, separando as responsabilidades em diferentes arquivos para facilitar a manutenção e a escalabilidade.
A API foi criada para servir de base para os testes de API e de performance.

Para rodar a API, navegue até a pasta /api, instale as dependências e então execute o comando para colocá-la em funcionamento

```
npm install
node server.js
```

## Endpoints da API

### GET /users
Retorna uma lista de usuários.

### POST /users
Cria um novo usuário.
- Campos obrigatórios: `name`, `username`, `email`, `address` (completo)
- Exemplo de corpo da requisição:
```json
{
  "name": "nome",
  "username": "nome_de_usuario",
  "email": "email@example.com",
  "address": {
    "street": "rua",
    "suite": "número",
    "city": "cidade",
    "zipcode": "cep",
    "geo": {
      "lat": "latitude",
      "lng": "longitude"
    },
    "phone": "telefone",
    "website": "site",
    "company": {
        "name": "nome_da_empresa",
        "catchPhrase": "slogan",
        "bs": "tipo_de_serviço"
    }
  }
}
```
### POST /error
Simula um erro interno no servidor (status 500).

Exemplo de resposta:

```
{
  "error": "Erro interno no servidor."
}
```

### 2.Testes com Cypress

OS testes em cypress tem como objetivo validar a qualidade de um formulário de cadastro de usuário, garantindo que ele funcione corretamente.
O projeto segue o padrão Page Object para organizar os testes de UI, facilitando a manutenção e a legibilidade do código. A estrutura do projeto é a seguinte:

cypress/
  ├── e2e/
  │   ├── cadastro/
  │   │   ├── cadastro.spec.cy.js
  │   │   └── cadastroPage.js
  ├── fixtures/
  │   └── cadastro_usuarios.json
  ├── support/
  │   └── commands.js
  └── cypress.config.js

Arquivos e Pastas:
- cypress/e2e/cadastro/cadastro.spec.cy.js: Contém os testes automatizados para o formulário de cadastro de usuário.
- cypress/e2e/cadastro/cadastroPage.js: Implementa a classe CadastroPage, que encapsula as interações com a página de cadastro.
- cypress/fixtures/cadastro_usuarios.json: Contém os dados de teste para os diferentes cenários de cadastro de usuário.

Para rodar os testes em Cypress, navegue até a pasta /testes_cypress, instale as dependências do projeto e então execute o comando para executar os testes, se necessário:

```
npm install
npx cypress open ou npx cypress run
```

Nota: Os testes Cypress foram escritos com base no modelo da tela de cadastro do site Guia de Motéis. Os cenários descritos nos testes não representam necessariamente o comportamento real da tela quando os inputs fornecidos no teste são incluídos. Eles foram criados com base em suposições de como uma tela de cadastro genérica poderia funcionar.

### 3. Testes de API com Postman

Para rodar os testes da API no Postman, utilize a versão Desktop do Postman ou a versão online. Neste projeto os testes foram realizados apenas com Postman Desktop App.

Seguem as instruções para a importação dos testes:

1. Abra o Postman
2. Clique em "Import"
3. Selecione o arquivo .json que está dentro da pasta testes_api_postman/

Lembre-se de iniciar a API antes de executar os testes da API.

Após importar o arquivo .json, clique nos três pontos (...) que estão do lado direito da collection, clique em "run collection" e no botão "Run Case guia de motéis".

### 4. Testes de performance

Para rodar os testes de performance no JMeter, você precisa ter o JMeter instalado. Se ainda não tiver, siga as instruções de instalação no site oficial do JMeter.

Após fazer o download do JMeter, abra o arquivo performance_test_plan.jmx no JMeter e execute o plano de teste.

Lembre-se de iniciar a API antes de executar os testes de performance.

## Relatório de Resultados dos Testes

### Testes de UI - Cypress

Os testes de UI foram realizados para validar o formulário de cadastro de usuário. Os cenários testados incluem:

- Cadastro de usuário com sucesso.
- Erro ao submeter formulário sem preencher campos obrigatórios.
- Erro ao inserir data de nascimento futura.
- Erro ao inserir idade menor que 18 anos.
- Erro ao inserir CEP inválido.
- Erro ao inserir e-mail inválido.
- Erro ao inserir e-mail diferente no campo de confirmação.
- Erro ao inserir senha fora do padrão.
- Erro ao tentar cadastrar com espaços em branco nos campos obrigatórios.

Considerando que os testes do cypress representam apenas testes com base em suposições de como uma tela de cadastro genérica poderia funcionar, não foi possível gerar um relatório real.

### Testes de API - Postman

Os testes de API foram realizados para validar a API REST construída. Os cenários testados incluem:

1. Ver todos os usuários

- URL: http://localhost:3000/users
- Método: GET
- Tempo de resposta: 67 ms
- Código de resposta: 200 OK
- Testes:
    - Deve retornar status 200;
    - Deve retornar uma lista de usuários válida.

2. Criar um novo usuário

- URL: http://localhost:3000/users
- Método: POST
- Tempo de resposta: 60 ms
- Código de resposta: 201 Created
- Testes:
    - Deve retornar status 201 ao criar um usuário;
    - Deve retornar um objeto contendo os dados do usuário criado;

3. Erro ao criar usuário

- URL: http://localhost:3000/users
- Método: POST
- Tempo de resposta: 5 ms
- Código de resposta: 400 Bad Request
- Testes:
    - Deve retornar status 400 para erro de validação;
    - Deve retornar uma mensagem de erro apropriada;

4. Simulando erro 500

- URL: http://localhost:3000/error
- Método: POST
- Tempo de resposta: 5 ms
- Código de resposta: 500 Internal Server Error
- Testes:
    - Deve retornar status 500;
    - Deve conter uma mensagem de erro no corpo da resposta;

Resumo dos Testes:

- Total de testes realizados: 8
- Total de testes aprovados: 8
- Total de testes falhados: 0
- Tempo total dos testes: 137 ms

Todos os testes de API foram executados com sucesso, validando os principais cenários de uso da API REST, incluindo a listagem de usuários, criação de novos usuários, tratamento de erro de validação e simulação de erros no servidor.

### Testes de Performance - JMeter

Os testes de performance foram realizados simulando 100 usuários simultâneos acessando a API. Os resultados incluem:

- Tempo de resposta médio: 23 ms
- Erro %: 0.000%
- Throughput: 108.57763 requests/second
- Uso de CPU/memória: O sistema se manteve estável durante o teste.

## Aggregate Report

| Label         | # Samples | Average | Median | 90% Line | 95% Line | 99% Line | Min | Max | Error % | Throughput | Received KB/sec | Sent KB/sec |
|--------------|-----------|---------|--------|----------|----------|----------|-----|-----|---------|------------|----------------|-------------|
| HTTP Request | 100       | 23      | 14     | 77       | 79       | 90       | 6   | 95  | 0.000%  | 108.57763  | 692.92         | 12.83       |
| **TOTAL**    | 100       | 23      | 14     | 77       | 79       | 90       | 6   | 95  | 0.000%  | 108.57763  | 692.92         | 12.83       |

## Summary Report

| Label         | # Samples | Average | Min | Max | Std. Dev. | Error % | Throughput | Received KB/sec | Sent KB/sec | Avg. Bytes |
|--------------|-----------|---------|-----|-----|-----------|---------|------------|----------------|-------------|------------|
| HTTP Request | 100       | 23      | 6   | 95  | 23.37     | 0.000%  | 108.57763  | 692.92         | 12.83       | 6535.0     |
| **TOTAL**    | 100       | 23      | 6   | 95  | 23.37     | 0.000%  | 108.57763  | 692.92         | 12.83       | 6535.0     |


### Ferramentas Utilizadas

- Cypress para testes de UI - versão 14.0.2.
- Postman para testes de API - versão Postman Desktop App 11.32.1.
- Apache JMeter para testes de performance - versão 5.6.3.

