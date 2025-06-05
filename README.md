# agenda-medica

Aplicativo para agendamento de consultas médicas

## Requisitos

- .NET 8.0
- Node.js 20+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Banco de Dados: PostgreSQL 13+

## Instalação

### Backend (API)

1. Acesse a pasta da API:
   ```sh
   cd api/AgendaMedica.API
   ```
2. Restaure os pacotes e rode a API:
   ```sh
   dotnet restore
   dotnet run
   ```
3. A API estará disponível em: `http://localhost:5132`

#### Configuração do Banco de Dados

- O banco de dados padrão é PostgreSQL. Para criar o banco de dados você pode utilizar o PGAdmin e criar um novo banco de dados com o nome `agenda_medica` ou rodar o seguinte comando pelo terminal:

  ```sh
  createdb agenda_medica
  ```

- Para criar uma nova migration:
  ```sh
  dotnet ef migrations add NOME_DA_MIGRATION -o .\Database\Migrations\
  ```

**PS.:** Todas a migrations devem ser rodadas assim que o comando `dotnet run` rodar.

### Frontend

1. Acesse a pasta do frontend:
   ```sh
   cd frontend
   ```
2. Instale as dependências:
   ```sh
   yarn
   ```
3. Inicie o frontend:
   ```sh
   yarn start
   ```
4. O frontend estará disponível em: `http://localhost:3000`

## TODOS

### Prontos

- Autenticação de usuários (login)
- Cadastro e listagem de médicos e pacientes
- Agenda do médico (criação e exclusão de horários)
- Marcação de consultas por pacientes
- Visualização de consultas agendadas

### Faltando

- Layout responsivo
- Cadastro de usuários
- Recuperação de senhaggaf
- Página com os detalhes da consulta
- Testes automatizados
- Deploy automatizado
- Documentação da API
