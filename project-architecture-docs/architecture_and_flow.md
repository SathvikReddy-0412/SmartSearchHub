# SearchHub: Multi-Category Search & Filter Platform
## System Architecture & Flow Documentation

This document explains the technical architecture, layer layout, and data flow sequences of the **SearchHub** project.

---

## 1. Project Directory Structure
To keep this documentation separate from deployable code, it is placed in `project-architecture-docs/` at the root of the repository.
- `/frontend` $\rightarrow$ Vite + React application (presentation tier).
- `/backend` $\rightarrow$ FastAPI Gateway & Spring Boot engine (logic & routing).
- `/project-architecture-docs` $\rightarrow$ **[This Folder]** Holds static architecture files. It is not referenced by any bundler or application script, ensuring that **if you deploy the frontend or backend, this folder will NOT be deployed**.

---

## 2. Multi-Tier Architecture Diagram
The platform is designed around a decoupled client-server architecture:

```
[ React Frontend ]  (Client Browser - Port 5173)
        │
        ▼  REST HTTP Mappings (JWT in Authorization Header)
[ FastAPI API Gateway ] (ASGI Gateway - Port 8000)
        │
        ▼  Internal Asynchronous Proxy
[ Spring Boot Server ] (Business Logic Tier - Port 8080)
        │
        ▼  JDBC / JPA Object Relational Mapping
[ PostgreSQL Database ] (Database Store - Port 5432)
```

---

## 3. Core System Flows

### A. Authentication & JWT Validation Flow
The system manages session authorization statelessly using signed JSON Web Tokens (JWT):

1. **Credentials Dispatch**: The user enters their username and password in the React login view. The client dispatches a `POST /api/v1/auth/login` request.
2. **Gateway Intercept**: FastAPI Gateway captures the request, validates the input structure against defined Pydantic models, and dispatches the payload to the Spring Boot auth route.
3. **Verify Hashed Credentials**: Spring Security maps the user database query, compares the incoming password with the stored hash using BCrypt, and validates authorization.
4. **Token Generation**: Spring Boot generates a secure JWT containing metadata claims (User ID, Username, Roles) signed using a secret key with the HS256 algorithm.
5. **Session Injection**: The generated token is passed back to React. The React frontend stores the JWT in the Zustand context store and injects it as a `Bearer` token in subsequent request headers.
6. **Access Control**: When fetching protected resources, Spring Security checks the signature and enforces Role-Based Access Control (RBAC) via method level checking.

---

### B. Multi-Category Search Flow
The unified search retrieves items dynamically across four different categories:

1. **User Request**: User types a query (e.g. "Java") and selects categories on the React search view.
2. **Query Dispatch**: Axios sends a request to FastAPI Gateway:
   `GET /api/v1/search?q=Java&category=Books,Courses`
3. **Gateway Asynchronous Mappings**: FastAPI forwards the request to the Spring Boot catalog controllers.
4. **PostgreSQL Relational Scan**: Spring Boot runs a JPQL or native full-text SQL scan over the `products`, `courses`, and `categories` tables, returning matches.
5. **Unified JSON Return**: Spring Boot aggregates the resources into a unified JSON format and returns it to the client.

---

## 4. Deploy Isolation Setup
To guarantee that this documentation folder is excluded from any cloud deployments (such as Vercel, Netlify, or Heroku):
- **Isolation by Directory**: The folder is placed outside the web app root directory (`frontend/`).
- **Ignore Rules**: We can add it to ignore files in the project root:
  - `.gitignore`: Prevents it from polluting code trackers if it needs to remain local (though here it is pushed for review).
  - `.vercelignore` / `.dockerignore` / `.cfignore`: Tells the cloud deployment engines to explicitly ignore this folder.
