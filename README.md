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

**PS.:** Todas a migrations irão ser aplicadas assim que o comando `dotnet run` rodar.

- Ao mesmo tempo que as migrations rodarem, o banco de dados também será populado com os usuários. Com eles, você poderá fazer login na plataforma e testar a aplicação. Todos eles usam a mesma senha `12345678` e têm os seguintes emails:
  - drauzio.varella@email.com: tem o `Role=Doctor`;
  - marcia.gold@email.com: tem o `Role=Doctor`;
  - anamaria@email.com: tem o `Role=Pacient`;
  - luciano.huck@email.com: tem o `Role=Pacient`;

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
- Layout responsivo
- Documentação da API

### Faltando

- Cadastro de usuários
- Recuperação de senha
- Página com os detalhes da consulta
- Testes automatizados
- Deploy automatizado

## Padrões de commits

O repositório utiliza o seguinte padrão de commits (baseado no [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)):

```sh
<tipo>(<scopo>): <mensagem>
```

- o **tipo** pode ser `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, etc...;
- o **scopo** é opcional, mas, se existir, deve referenciar alguma tarefa, alguma feature ou até mesmo se é backend ou frontend (como utilizei em meus commits); e
- a **mensagem** deve sempre começar com um verbo no imperativo e relatar com clareza as mudanças realizadas.
