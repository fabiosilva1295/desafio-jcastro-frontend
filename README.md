# Frontend - Gerenciador de Contatos

Este é o frontend de um sistema de gerenciamento de contatos, desenvolvido com **Angular** e **PrimeNG**. A aplicação permite criar, editar, listar e excluir contatos, além de realizar validações em tempo real.

## 📌 Tecnologias Utilizadas

- **Angular** - Framework principal
- **TypeScript** - Linguagem de desenvolvimento
- **PrimeNG** - Biblioteca de componentes UI
- **RxJS** - Para manipulação de observables
- **SCSS** - Estilização

## 🚀 Funcionalidades

- 📋 Listagem de contatos
- ➕ Criação de novos contatos
- ✏️ Edição de contatos existentes
- ❌ Exclusão de contatos
- 🔍 Validação de e-mail e telefone
- ⚡ Validação assíncrona para verificar se o telefone já está cadastrado

## 📂 Estrutura do Projeto

```
frontend/
│-- src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── contact-list/
│   │   │   │   ├── contact-list.component.ts
│   │   │   │   ├── contact-list.component.html
│   │   │   │   ├── contact-list.component.scss
│   │   │   ├── contact-edit/
│   │   │   │   ├── contact-edit.component.ts
│   │   │   │   ├── contact-edit.component.html
│   │   │   │   ├── contact-edit.component.scss
│   │   ├── models/
│   │   │   ├── contacts.model.ts
│   │   ├── services/
│   │   │   ├── contacts.service.ts
│   │   │   ├── avatar.service.ts
│   │   ├── app.module.ts
│   │   ├── app.component.ts
│   │   ├── app-routing.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
```

## ⚙️ Como Executar o Projeto

### 1️⃣ Instalar Dependências

Execute o seguinte comando para instalar as dependências:

```sh
npm install
```

### 2️⃣ Executar o Servidor Angular

Para iniciar o frontend, rode o comando:

```sh
ng serve
```

A aplicação ficará acessível em: [http://localhost:4200](http://localhost:4200)

## 🔗 Conexão com o Backend

O backend deve estar rodando na porta correta. Por padrão, o frontend está configurado para se comunicar com a API via `http://localhost:3000/api`.

Caso precise alterar, modifique o arquivo **`environment.ts`**:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## ✨ Melhorias Futuras

- 🔄 Paginação na listagem de contatos
- 🔔 Notificações visuais ao criar/editar contatos
- 📱 Melhor responsividade
- 🔐 Autenticação de usuários

---

Desenvolvido com 💙 por Fábio Francisco da Silva

