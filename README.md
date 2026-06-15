# 🔍 SmartSearchHub — Enterprise Multi-Category Search & Analytics Platform

[![Node.js](https://img.shields.io/badge/Node.js-v16%2B-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F.svg?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-4169E1.svg?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6%2B-47A248.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

**SmartSearchHub** is a production-ready, full-stack, distributed multi-microservice application. It is designed to orchestrate search, filtering, user profiles, and advanced analytical logging across multiple domains (e.g., Electronics, Courses, Books, and Technology Tools). 

The platform leverages a hybrid database model (PostgreSQL + MongoDB), a FastAPI-driven API Gateway for proxying and aggregation, and specialized backend microservices for core data and high-speed search analytics.

---

## 🏛️ System Architecture

SmartSearchHub uses a modular microservices architecture designed for high performance, ease of scaling, and separation of concerns:

```
                  ┌────────────────────────┐
                  │   React SPA Frontend   │ (Port 5173 / Render Static Site)
                  └───────────┬────────────┘
                              │ HTTPS Requests
                              ▼
                  ┌────────────────────────┐
                  │  FastAPI API Gateway   │ (Port 8000 / Render Web Service)
                  └─────┬────────────┬─────┘
                        │            │
         ┌──────────────┘            └──────────────┐
         │ HTTP Proxied                              │ HTTP Proxied
         ▼                                           ▼
┌────────────────────────┐                  ┌────────────────────────┐
│  Spring Boot Backend   │ (Port 8080)      │  Node.js Analytics API │ (Port 5001)
└──────────┬─────────────┘                  └──────────┬─────────────┘
           │                                           │
           ▼ (JPA / SQL)                               ▼ (Mongoose / NoSQL)
┌────────────────────────┐                  ┌────────────────────────┐
│  PostgreSQL Database   │                  │    MongoDB Database    │
│ (Users, Items, Catalog)│                  │  (Logs, Trends, History)│
└────────────────────────┘                  └────────────────────────┘
```

1. **Frontend (React + Vite)**: A responsive UI utilizing state managers (Zustand) for dynamic search, multi-faceted filtering, modern dark/light themes, and administrative dashboards.
2. **Gateway (FastAPI)**: Serves as the single entry point. Orchestrates incoming traffic, manages CORS, routes authentication, proxies requests to downstream APIs, and manages unified JSON documentation.
3. **Core Backend (Spring Boot + JPA)**: Handles core business logic, user management (RBAC), security, and transactional relational data stored in PostgreSQL.
4. **Analytics Backend (Node.js + Express)**: A dedicated high-performance event-logging service. It processes queries to extract trending keywords, search history, suggestions, and dashboard analytics, backed by MongoDB.

---

## 📁 Repository Structure

This monorepo is organized as follows:

```
SmartSearchHub/
├── frontend/                   # React SPA Frontend (Vite, TailwindCSS)
│   ├── src/                    # App source (Components, Pages, Stores, Utils)
│   ├── public/                 # Static assets
│   ├── package.json            # Node dependencies
│   └── vite.config.js          # Vite config & dev server proxies
│
├── gateway/                    # FastAPI API Gateway (Python)
│   ├── controllers/            # Route controllers & proxy mechanisms
│   ├── models/                 # Request/Response schemas (Pydantic)
│   ├── services/               # Internal API services
│   ├── main.py                 # ASGI entrance
│   ├── run.py                  # Uvicorn bootstrapper
│   └── requirements.txt        # Python library list
│
├── backend/                    # Core Database Backend (Java/Spring Boot)
│   ├── src/                    # Spring Boot Source Code
│   └── pom.xml                 # Maven configuration
│
├── Nodejs/                     # Search Analytics & Autocomplete Microservice (Express)
│   ├── config/                 # DB connections (Mongoose Atlas)
│   ├── controllers/            # Analytics logs handlers
│   ├── models/                 # MongoDB schemas (RecentSearch, SearchLog, Trends)
│   ├── routes/                 # API endpoint routing
│   ├── server.js               # Entry point
│   └── package.json            # Node backend dependencies
│
├── CONNECTION_GUIDE.md         # Developer Integration & Port mapping documentation
├── start_frontend.sh/.bat      # Shortcut scripts to run React UI
├── start_gateway.sh/.bat       # Shortcut scripts to run FastAPI Gateway
└── start_spring_backend.sh/.bat # Shortcut scripts to run Spring Boot Backend
```

---

## 🚀 Getting Started

### Prerequisites
Make sure the following dependencies are installed locally:
- **Node.js** (v16.0.0 or higher)
- **Python 3.8+**
- **Java JDK 17** and **Maven**
- **PostgreSQL** (running locally on port `5432`)
- **MongoDB** (local server or MongoDB Atlas Cluster)

---

### 📦 Local Configuration

You will need to create local `.env` files based on the provided templates to run the services.

#### 1. Frontend Configuration (`frontend/`)
Create a `.env` file inside the `frontend` folder:
```bash
cp frontend/.env.example frontend/.env
```
Inside `.env`, configure the API Gateway location:
```env
VITE_API_URL=http://localhost:8000/api
```

#### 2. Nodejs Analytics Configuration (`Nodejs/`)
Create a `.env` file inside the `Nodejs` folder:
```bash
cp Nodejs/.env.example Nodejs/.env
```
Inside `.env`, configure your server port and MongoDB connection URI:
```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxxx.mongodb.net/searchhub_analytics?retryWrites=true&w=majority
```

#### 3. Spring Boot Backend Database (`backend/`)
Create a PostgreSQL database named `Seach-hub` (or update database config). Configure your database username and password in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Seach-hub
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password
```

---

### 🏃 Running the Services

#### Option A: Quick-Start Scripts
Use the pre-packaged startup scripts to start each service in a separate terminal:

* **On Linux/macOS:**
  ```bash
  ./start_spring_backend.sh  # Terminal 1
  ./start_gateway.sh         # Terminal 2
  ./start_frontend.sh        # Terminal 3
  # Node.js service must be run manually:
  cd Nodejs && npm install && npm start
  ```

* **On Windows:**
  ```cmd
  start_spring_backend.bat   :: Terminal 1
  start_gateway.bat          :: Terminal 2
  start_frontend.bat         :: Terminal 3
  :: For Node.js Analytics:
  cd Nodejs && npm install && npm start
  ```

#### Option B: Manual Startup

1. **Spring Boot Backend**:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   *Runs on http://localhost:8080*

2. **FastAPI Gateway**:
   ```bash
   cd gateway
   python -m venv venv
   source venv/bin/activate # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python run.py
   ```
   *Runs on http://localhost:8000* (Docs available at `http://localhost:8000/docs`)

3. **Node.js Analytics Backend**:
   ```bash
   cd Nodejs
   npm install
   npm start
   ```
   *Runs on http://localhost:5001*

4. **React Frontend SPA**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Runs on http://localhost:5173*

---

## ☁️ Deployment Guide (Render)

Render is a modern cloud hosting platform ideal for deploying multi-service applications. Here is how you can deploy each component of SmartSearchHub from this repository.

### 1. Databases (Prerequisites)
- **PostgreSQL**: Create a new **PostgreSQL Database** on Render. Note the *Internal Database URL* (for services running on Render) and the *External Database URL* (for local testing).
- **MongoDB**: Deploy a free tier MongoDB cluster on **MongoDB Atlas** and whitelist `0.0.0.0/0` (or the specific outbound IPs of your Render services).

### 2. Spring Boot Core Service (`backend`)
Deploy the Spring Boot core backend as a **Web Service**:
- **Repository**: Connect your GitHub repository.
- **Root Directory**: `backend`
- **Runtime**: `Docker` (if using a Dockerfile) or **Java** (with Gradle/Maven builders).
  - **Build Command**: `mvn clean package -DskipTests`
  - **Start Command**: `java -jar target/backend-0.0.1-SNAPSHOT.jar` (verify the actual JAR name)
- **Environment Variables**:
  - `SPRING_DATASOURCE_URL`: (Paste the PostgreSQL connection URL provided by Render)
  - `SPRING_DATASOURCE_USERNAME`: (PostgreSQL username)
  - `SPRING_DATASOURCE_PASSWORD`: (PostgreSQL password)

### 3. Node.js Analytics API (`Nodejs`)
Deploy the Node.js analytics microservice as a **Web Service**:
- **Root Directory**: `Nodejs`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `PORT`: `5001`
  - `MONGO_URI`: (Your MongoDB Atlas connection string)

### 4. FastAPI API Gateway (`gateway`)
Deploy the Gateway as a **Web Service**:
- **Root Directory**: `gateway`
- **Runtime**: `Python`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**:
  - `SPRING_BACKEND_URL`: (The public URL of your deployed Spring Boot Web Service on Render)
  - `NODE_JS_URL`: (The public URL of your deployed Node.js Web Service on Render)

### 5. React SPA Frontend (`frontend`)
Deploy the UI as a **Static Site**:
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: (The public URL of your deployed FastAPI Gateway Web Service on Render, suffixed with `/api`)

---

## 📡 API Endpoints

All requests should go through the **API Gateway** (`http://localhost:8000` or your deployed gateway URL) for orchestration:

| Service | Method | Route | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Register a new user |
| **Auth** | `POST` | `/api/auth/login` | Log in and receive JWT token |
| **Catalog** | `GET` | `/api/categories` | Retrieve search categories |
| **Catalog** | `GET` | `/api/items` | Retrieve catalog items/products |
| **Catalog** | `POST` | `/api/items` | Add a new item (Admin only) |
| **Catalog** | `DELETE` | `/api/items/{id}` | Delete a catalog item (Admin only) |
| **Analytics** | `POST` | `/api/search` | Log search query triggers (Node.js backend) |
| **Analytics** | `GET` | `/api/search/trending` | Get trending search keywords |
| **Analytics** | `GET` | `/api/search/recent/{uid}`| Get recent search queries for a specific user |
| **Analytics** | `GET` | `/api/search/suggestions`| Get live search autocomplete suggestions |
