
# MyEcommerceApp

## Overview

MyEcommerceApp is a full-stack, microservices-based e-commerce platform built with **NestJS**, **PostgreSQL**, and **Next.js**. It features:

- Products and Orders microservices (NestJS, TypeORM, PostgreSQL)
- API Gateway with JWT authentication and HTTP proxying
- Modern UI (Next.js/React) for login, product management, and order management
- Containerized with Docker Compose
- API documentation (Swagger) and Postman collection
- Nx monorepo for scalable development

## Features

### Products Service
- CRUD operations for products
- Fields: Product Code, Name, Description, Rate, Image

### Orders Service
- Create and view orders
- Fields: Order ID, Customer (name, phone), Products, Total Amount

### API Gateway
- Single REST API entrypoint for frontend
- Routes requests to Products and Orders services
- JWT authentication for protected endpoints

### UI
- Login page (JWT auth)
- Products page (list, create)
- Orders page (list, create)
- Simple navigation

## Tech Stack

- **Backend:** NestJS, TypeORM, PostgreSQL
- **API Gateway:** NestJS, JWT
- **Frontend:** Next.js (React, TypeScript)
- **Monorepo:** Nx
- **Containerization:** Docker, Docker Compose

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Docker & Docker Compose

### Development Setup
1. **Install dependencies:**
	```sh
	npm install
	```
2. **Start PostgreSQL and all services with Docker Compose:**
	```sh
	docker-compose up --build
	```
	- Products: http://localhost:3001
	- Orders: http://localhost:3002
	- API Gateway: http://localhost:3000
	- UI: http://localhost:4200

3. **Run services individually (optional):**
	```sh
	nx serve products
	nx serve orders
	nx serve api-gateway
	nx serve ui
	```

### Running Tests
```sh
npx nx test products
npx nx test orders
```

### API Documentation
- **Swagger UI:**
  - Products: http://localhost:3001/api
  - Orders: http://localhost:3002/api
  - API Gateway: http://localhost:3000/api
- **Postman Collection:** See `postman_collection.json` in the project root

### Environment Variables
- See `.env.example` or service configs for JWT secret and DB connection settings

## Folder Structure

```
apps/
  products/         # Products microservice (NestJS)
  orders/           # Orders microservice (NestJS)
  api-gateway/      # API Gateway (NestJS)
  ui/               # Next.js frontend
docker-compose.yml  # Orchestration for all services
postman_collection.json
README.md
```

## Usage

1. **Login:** Use the UI at `/login` to authenticate and receive a JWT
2. **Products:** Manage products at `/products` (list, create)
3. **Orders:** Manage orders at `/orders` (list, create)

## Contributing

Pull requests are welcome! Please open an issue first to discuss major changes.

## License

MIT
