
# 🚀 MyEcommerceApp 🛒

> A full-stack, microservices-based e-commerce platform built for modern development.

Welcome to **MyEcommerceApp**! This project showcases a powerful backend architecture using **NestJS** microservices, all orchestrated with **Docker** and managed in a clean **Nx monorepo**. The frontend is a snappy **Next.js** application.

-----

## ✨ Core Features

	* ✅ **Products Service:** Full CRUD operations for everything you sell.
	* ✅ **Orders Service:** Effortlessly create and view customer orders.
	* ✅ **API Gateway:** A single, secure entry point with JWT authentication.
	* ✅ **Modern UI:** A user-friendly interface built with Next.js and React.
	* ✅ **Containerized:** Spin everything up with one command using Docker Compose.
	* ✅ **Developer Friendly:** Comes with Swagger docs and a Postman collection out-of-the-box.

-----

## 🛠️ Tech Stack

| Component         | Technology                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **Backend** | <img src="https://skillicons.dev/icons?i=nestjs" width="20"/> NestJS, <img src="https://skillicons.dev/icons?i=ts" width="20"/> TypeScript, <img src="https://skillicons.dev/icons?i=postgresql" width="20"/> PostgreSQL |
| **Frontend** | <img src="https://skillicons.dev/icons?i=nextjs" width="20"/> Next.js, <img src="https://skillicons.dev/icons?i=react" width="20"/> React                               |
| **Architecture** | Microservices, <img src="https://skillicons.dev/icons?i=nx" width="20"/> Nx Monorepo                                                                        |
| **DevOps** | <img src="https://skillicons.dev/icons?i=docker" width="20"/> Docker, Docker Compose                                                                   |
| **Authentication**| 🔑 JWT (JSON Web Tokens)                                                                                    |

-----

## 🚀 Getting Started

Ready to launch? Just follow these simple steps.

### Prerequisites

	* Node.js (v18+ recommended)
	* Docker & Docker Compose

### ⚙️ Development Setup

1.  **Clone & Install**
		Clone the repository and install all the necessary dependencies.

		```sh
		npm install
		```

2.  **Launch with Docker!** 🐳
		This single command builds and starts the database, all microservices, the gateway, and the UI.

		```sh
		docker-compose up --build
		```

		Your application is now running!

			* 📦 **Products Service**: `http://localhost:3001`
			* 🛒 **Orders Service**: `http://localhost:3002`
			* 🚪 **API Gateway**: `http://localhost:3000`
			* 🖥️ **UI**: `http://localhost:4200`

-----

## 🧪 Running Tests

To run the unit tests for the services, use the Nx CLI:

```sh
npx nx test products
npx nx test orders
```

-----

## 📚 API Documentation

You can explore and test the APIs using Swagger or Postman.

	* **Swagger UI** 📖

			* **Gateway (Main Docs):** `http://localhost:3000/api`
			* **Products Service:** `http://localhost:3001/api`
			* **Orders Service:** `http://localhost:3002/api`

	* **Postman** 🧑‍🚀
		A ready-to-use collection is included! Just import `postman_collection.json` into Postman.

-----

## 📁 Folder Structure

The project is organized in a clean monorepo structure:

```
apps/
	├── 📦 products/      # Products microservice (NestJS)
	├── 🛒 orders/        # Orders microservice (NestJS)
	├── 🚪 api-gateway/   # API Gateway (NestJS)
	└── 🖥️ ui/            # Next.js frontend
docker-compose.yml     # The magic orchestration file ✨
postman_collection.json
README.md
```

-----

## 🙌 Contributing

Contributions are welcome! If you have a great idea or find a bug, please open an issue to discuss it first.

## 📄 License

This project is licensed under the **MIT License**.
