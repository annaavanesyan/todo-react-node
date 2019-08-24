# Setup and development

- [Setup and development](#setup-and-development)
  - [First-time setup](#first-time-setup)
  - [Installation](#installation)
    - [Database](#database)
    - [Configuration](#configuration)
    - [Dev server](#dev-server)
  - [Generators](#generators)
  - [Docker](#docker)
    - [Docker installation](#docker-installation)
    - [Docker-compose installation](#docker-compose-installation)
    - [Run](#run)

## First-time setup

Make sure you have the following installed:

- [Node](https://nodejs.org/en/) (at least the latest LTS)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) (at least 1.0)

Then update the following files to suit your application:

## Installation

```bash
# Install dependencies from package.json
yarn install
```

> Note: don't delete yarn.lock before installation

### Database

> PostgreSQL relational database is used. Postgre is required to be installed locally.

### Configuration

Before start please install PostgreSQL and fill correct configurations in `.env.example` file

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=todo
```

```bash
# To create new migration file
yarn typeorm:migration:create migration_name

# Truncate full database (note: it's not deleting the database)
yarn typeorm:schema:drop

# Generate migration from update of entities
yarn migration:generate migration_name
```
