# API Restful de Controle de Produtos e Usuários

Este projeto é uma API Restful para controle de produtos e usuários, desenvolvida como estudo utilizando tecnologias como TypeScript, Express, TypeORM, Docker, AWS S3, JWT, entre outras.

## Tecnologias Utilizadas:
- **Node.js**: Ambiente de execução JavaScript para backend.

- **ExpressJs**: Framework web minimalista e flexível para Node.js.

- **TypeScript**: Superset do JavaScript que adiciona tipagem estática e recursos avançados.

- **TypeORM**: ORM para TypeScript que simplifica a interação com bancos de dados.

- **PostgreSQL (via Docker)**: Banco de dados relacional robusto e escalável.

- **Redis (via Docker)**: Armazenamento de dados em memória para cache e otimização de performance.

- **Cloudflare R2/Amazon S3**: Serviço de armazenamento de objetos escalável para armazenar arquivos de forma segura.

- **Amazon SES**: Serviço de envio de emails transacionais para comunicação com usuários.

- **Outras**

## Passo a Passo para Configuração

### 1. Clonando o Repositório
Clone o repositório para sua máquina local utilizando o seguinte comando:
```bash
git clone https://github.com/PedroDanielBrunetto/api-vendas.git
```

### 2. Instalando as Dependências
Navegue até a pasta do projeto e instale as dependências:
```bash
npm install
```

### 3. Configurando o Banco de Dados
Crie um arquivo `ormconfig.json` na raiz do projeto com as seguintes configurações:
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "apivendas",
  "entities": [
    "./src/modules/**/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/typeorm/migrations"
  }
}
```

### 4. Criando o Diretório de Uploads
Crie uma pasta chamada `uploads` na raiz do projeto. Esta pasta será utilizada para armazenar arquivos temporários.

### 5. Iniciando o Container Docker
Inicie um container Docker com PostgreSQL usando o seguinte comando:
```bash
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

### 6. Criando o Banco de Dados
Utilizando uma ferramenta como [DBeaver](https://dbeaver.io/) ou [pgAdmin](https://www.pgadmin.org/), conecte-se à instância PostgreSQL que foi criada com as seguintes credenciais:
- **Host**: `localhost`
- **Porta**: `5432`
- **Usuário**: `postgres`
- **Senha**: `docker`

Crie um banco de dados chamado `apivendas`.

### 7. Executando as Migrations
Com o container rodando e o banco de dados criado, execute as migrations para configurar as tabelas:
```bash
npm run typeorm migration:run
```

### 8. Iniciando o Servidor
Após todas as etapas anteriores, você pode iniciar a aplicação com o comando:
```bash
npm run dev
```

### 9. Futuras Funcionalidades
Novas funcionalidades e instruções serão adicionadas conforme o projeto evolui. Certifique-se de acompanhar as atualizações para manter o ambiente corretamente configurado.

---
