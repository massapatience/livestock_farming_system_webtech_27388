# 🐾 Livestock Farming Management System

**AUCA Final-Term Project | WEB TECHNOLOGY (INSY 8322)**

A full-stack web application for managing livestock farm operations including animal registry, health records, breeding, feed inventory, and sales.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express (Layered Architecture) |
| Relational DB | PostgreSQL + Sequelize ORM |
| Non-Relational DB | MongoDB + Mongoose |
| Authentication | JWT + Google OAuth2 (Passport.js) |
| Authorization | RBAC (admin / farmer / vet) |
| Message Broker | RabbitMQ (email notifications) |
| Email | Nodemailer |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Testing | Jest + Supertest |

---

## Project Structure

```
livestock-system/
├── backend/
│   ├── src/
│   │   ├── config/        # DB, Passport, Logger
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Auth, RBAC, Error handler
│   │   ├── models/        # PostgreSQL + MongoDB schemas
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # RabbitMQ, Email
│   │   ├── workers/       # RabbitMQ consumers
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/           # Axios instance
│   │   ├── components/    # Layout, shared UI
│   │   ├── context/       # Auth context
│   │   ├── pages/         # All page components
│   │   └── App.jsx
│   └── Dockerfile
├── .github/workflows/     # CI/CD pipeline
└── docker-compose.yml
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL
- MongoDB
- RabbitMQ
- Docker (optional)

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
cp backend/.env.example backend/.env
# Fill in your DB credentials, JWT secret, Google OAuth keys
```

### 3. Run with Docker (Recommended)

```bash
docker-compose up --build
```

### 4. Run Manually

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

---

## API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/google | Public |
| GET | /api/auth/me | All roles |
| GET/POST | /api/animals | Farmer, Admin |
| GET/POST | /api/health | Vet, Admin |
| GET/POST | /api/breeding | Farmer, Admin |
| GET/POST | /api/feed | Farmer, Admin |
| GET/POST | /api/sales | Farmer, Admin |
| GET | /api/users | Admin only |

---

## User Roles

| Role | Permissions |
|---|---|
| Admin | Full access to all modules + user management |
| Farmer | Manage own animals, feed, breeding, sales |
| Vet | View animals, create health/vaccination records |

---

## Running Tests

```bash
cd backend
npm test
```

---

## CI/CD

GitHub Actions pipeline (`.github/workflows/ci-cd.yml`):
1. Runs backend tests on every push/PR to `main`
2. Builds and pushes Docker images to Docker Hub on merge to `main`

Set these GitHub secrets: `DOCKER_USERNAME`, `DOCKER_PASSWORD`
