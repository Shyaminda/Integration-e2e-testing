# 🧪 Integration Testing

This repository provides a robust integration testing setup for a Node.js application using PostgreSQL, Docker, Prisma, and Vitest.

---

## 🧬 Technology Stack

- **Node.js** with **TypeScript**
- **Vitest** for unit and integration testing
- **Supertest** for HTTP assertions
- **Prisma** ORM for database operations
- **PostgreSQL** managed via Docker
- **GitHub Actions** for automated testing and CI/CD

---

## 🚀 Getting Started

Follow the steps below to initialize the testing environment and run your tests locally.

### 📦 Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (v20 recommended)
- [npm](https://www.npmjs.com/)
- Permission to execute shell scripts (`chmod`)

---

### ⚙️ Setup & Run Tests

```bash
# Ensure the script exits on any failure
set -e

# Start PostgreSQL in a Docker container
docker-compose up -d

# Wait for the database to become available
echo '🟡 - Waiting for database to be ready...'
./scripts/wait-for-it.sh "postgresql://postgres:mysecretpassword@localhost:5432/postgres" -- echo '🟢 - Database is ready!'

# Apply Prisma migrations
npx prisma migrate dev --name init

# Run the test suite
npm run test || TEST_EXIT_CODE=$?

# Tear down the Docker container
docker-compose down

# Exit with the test process's exit code
exit ${TEST_EXIT_CODE:-0}
```

---

## 🧪 NPM Scripts

| Script                  | Description                                           |
|-------------------------|-------------------------------------------------------|
| `npm run dev`           | Compiles and starts the application                   |
| `npm run test`          | Executes all tests using Vitest                      |
| `npm run test:integration` | Runs integration tests via `scripts/run-integration.sh` |

---

## 🐳 Docker Compose Configuration

The `docker-compose.yml` file provisions a PostgreSQL service:

```yaml
services:
  db:
    image: postgres
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=mysecretpassword
    ports:
      - '5432:5432'
```

---

## ✅ CI/CD Pipeline

GitHub Actions is configured to run integration tests automatically on push and pull request events targeting the `main` branch.

Workflow highlights:
- Checks out the repository
- Sets up Docker and Node.js
- Installs dependencies
- Copies environment variables
- Grants script execution permissions
- Runs integration tests

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

---

## 📂 Project Structure

```
integration-testing/
├── scripts/
│   ├── run-integration.sh
│   └── wait-for-it.sh
├── docker-compose.yml
├── .env.example
├── package.json
└── ...
```

---

## 📝 License

This project is licensed under the MIT.

