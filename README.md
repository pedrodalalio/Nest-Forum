# 💬 Nest Forum

O **Nest Forum** é uma aplicação backend desenvolvida com **NestJS** que simula um fórum de perguntas e respostas, semelhante ao Stack Overflow.  
O projeto implementa conceitos de **Domain-Driven Design (DDD)**, **Clean Architecture** e **Testes Automatizados**.

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) (ORM)
- [PostgreSQL](https://www.postgresql.org/) (Banco de dados)
- [Docker](https://www.docker.com/)
- [Vitest](https://vitest.dev/) (testes)
- [JWT](https://jwt.io/)
- [BCrypt](https://www.npmjs.com/package/bcrypt)

---

## ⚙️ Funcionalidades

- **Autenticação de Usuários**
  - Registro e login com JWT
  - Criptografia de senha com BCrypt

- **Fórum**
  - Criar perguntas
  - Responder perguntas
  - Comentar em perguntas e respostas
  - Adicionar/remover anexos
  - Votar em respostas
  - Selecionar a melhor resposta

---

## 🛠️ Como rodar o projeto

### 1. Clonar o repositório
```
git clone https://github.com/pedrodalalio/Nest-Forum.git
cd Nest-Forum-main
```

### 2. Configurar banco de dados
```
  docker-compose up -d
```

### 3. Rodar migrations
```
  npx prisma migrate dev
```

### 4. Rodar aplicação
```
  npm install
  npm run start:dev
```

## 🧪 Testes

### Unitários
```
  npm run test
```

### E2E
```
  npm run test:e2e
```
