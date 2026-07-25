# E-Commerce Catalog API

API de catálogo para un e-commerce construida con NestJS, TypeScript, PostgreSQL y TypeORM.

## Stack

- NestJS 11
- TypeScript
- PostgreSQL 16 (Docker)
- TypeORM
- class-validator / class-transformer
- `ValidationPipe` global para validación de DTOs

## Estado del proyecto

Este proyecto cumple con los siguientes pasos:

1. Setup del proyecto y conexión a PostgreSQL con TypeORM
2. Entity y módulo de Category con CRUD simple
3. Entity de Product con relación Many-to-One a Category
4. DTOs de Product + validación con `ValidationPipe`
5. Service y Controller de Product
6. Filtros y paginación vía query params
7. Manejo de errores y excepciones HTTP con `NotFoundException` y `ConflictException`

## Requisitos

- Node.js 20+ recomendado
- PostgreSQL corriendo en Docker
- npm instalado

## Configuración de Docker

El archivo `docker-compose.yml` ya contiene el servicio de PostgreSQL:

```yaml
version: '3.8'
services:
  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: nest
      POSTGRES_PASSWORD: nest
      POSTGRES_DB: ecommerce
    ports:
      - '5432:5432'
    volumes:
      - db_data:/var/lib/postgresql/data
volumes:
  db_data:
```

Arranca el contenedor con:

```bash
docker compose up -d
```

## Variables de entorno

Configura estas variables antes de ejecutar la app:

- `DB_HOST` (por ejemplo `localhost`)
- `DB_PORT` (por defecto `5432`)
- `DB_USER` (por defecto `nest`)
- `DB_PASSWORD` (por defecto `nest`)
- `DB_NAME` (por defecto `ecommerce`)
- `PORT` (por defecto `3000`)

## Ejecutar la aplicación

```bash
npm install
npm run start:dev
```

La API quedará disponible en `http://localhost:3000`.

## Endpoints principales

### Categorías

- `GET /categories` → listar categorías
- `GET /categories/:id` → obtener una categoría por id
- `POST /categories` → crear categoría
- `PATCH /categories/:id` → actualizar categoría
- `DELETE /categories/:id` → borrar categoría

### Productos

- `GET /products` → listar productos
- `GET /products/:id` → obtener producto por id
- `POST /products` → crear producto
- `PATCH /products/:id` → actualizar producto
- `DELETE /products/:id` → borrar producto

### Filtros y paginación en productos

`GET /products` acepta query params opcionales:

- `categoryId`
- `minPrice`
- `maxPrice`
- `limit`
- `offset`

Ejemplo:

```http
GET /products?categoryId=1&minPrice=10&maxPrice=100&limit=5&offset=0
```

## Validación y errores

- `ValidationPipe` global transforma y valida DTOs.
- `NotFoundException` se lanza cuando no existe producto, categoría o categoría relacionada.
- `ConflictException` se lanza si se intenta crear/actualizar un producto con nombre duplicado.

## Notas finales

- `synchronize: true` está habilitado para desarrollo. No lo uses en producción.
- El proyecto está completo para una API de catálogo con CRUD, filtros y manejo básico de errores.
- Si quieres avanzar, el siguiente paso natural sería agregar autenticación JWT y separar los entornos de configuración.
