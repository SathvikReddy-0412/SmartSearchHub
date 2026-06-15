# DSEDBD Multi-Category Search and Filter Platform
## Project Update Report (Review-1 Status)

---

## 📋 Project Overview

The **Multi-Category Search and Filter Platform** is a secure, high-performance, full-stack web application developed as part of the DSEDBD Hackathon. The platform provides a centralized portal for searching, filtering, and managing educational and product resources. 

By leveraging a modular microservice-inspired architecture, the application decouples client representation, gateway routing, business logic control, and database persistence to achieve high scalability, clean code separation, and reliable security.

---

## 🏛️ System Integration Flow

The application follows a unidirectional data flow for secure processing and response retrieval:

```
[ Frontend: React.js ]
         │
         ▼ (HTTPS request with JWT Bearer Token)
[ API Gateway: FastAPI ]
         │
         ▼ (Request Routing & Validation)
[ Backend: Spring Boot & Spring Security ]
         │
         ▼ (Role-Based Authorization & JPA Persistence)
[ Database: PostgreSQL ]
```

1. **Frontend**: React components construct the user interfaces and fire API requests.
2. **FastAPI Gateway**: Serves as a single entry point, routing requests to the target Spring Boot controllers while managing API rules.
3. **Spring Boot (Backend)**: Validates authorization tokens (JWT), checks RBAC permissions, processes business rules, and performs transactions.
4. **PostgreSQL**: Stores relational models securely with appropriate keys and constraints.

---

## 💻 Technology Stack

| Layer | Technology | Key Responsibility / Features |
| :--- | :--- | :--- |
| **Frontend** | **React.js & Vite** | SPA Framework, State management, custom dashboards, dynamic search views. |
| **Gateway** | **FastAPI** | Lightweight router, asynchronous processing, API endpoint grouping. |
| **Backend Service** | **Spring Boot** | Enterprise backend, dependency injection, JPA/Hibernate mapping, MVC routing. |
| **Security Layer** | **Spring Security + JWT** | Stateless session filters, encryption, token parsing, RBAC validation. |
| **Database** | **PostgreSQL** | Relational storage, ACID transactions, relational referential integrity. |
| **Version Control** | **Git & GitHub** | Collaborative branch flow, code integration, history tracking. |

---

## 🔑 Features Implemented

### 1. User & Authentication Module
* **Registration**: Secure creation of user accounts.
* **Authentication**: Password verification and stateless token issuance.
* **Profile Management**: Viewing and updating personal credentials and metadata.
* **Security Filter Chain**: Intercepting request cycles to authenticate via JSON Web Tokens (JWT).

### 2. Role-Based Access Control (RBAC)
The platform defines two separate user roles with distinct accessibility rules:

* **`ADMIN` Features**:
  * Manage system Users (Create, Read, Update, Delete).
  * Manage Products catalog.
  * Manage resource Categories.
  * Manage educational Courses.
* **`USER` Features**:
  * Browse the inventory of Products.
  * Perform advanced Searches across products, categories, and courses.
  * View course directories and category groupings.

---

## 🔄 CRUD & Search Capabilities

The platform implements fully-integrated CRUD (Create, Read, Update, Delete) services for four main entities:

### Entities & CRUD Operations
1. **Users**: Full management by `ADMIN` role; self-management by `USER`.
2. **Products**: Catalog manipulation by `ADMIN`; browsing and searching by `USER`.
3. **Categories**: Organizing metadata by `ADMIN`; structural categorization by `USER`.
4. **Courses**: Course creation and detail mapping by `ADMIN`; exploration by `USER`.

### Search System
* **Cross-Entity Search**: Fast retrieval of Products, Categories, and Courses.
* **Search Filtering**: Refinement of search results using categories, price brackets, and courses durations.

---

## 🧪 Testing Completed & Verified

The following modules have undergone validation cycles to ensure stability:

### 1. Security & Authentication Testing
* User registration creates encoded passwords in PostgreSQL.
* Login returns valid JWT credentials containing user attributes and roles.
* Unauthorized access to protected endpoints yields `401 Unauthorized` or `403 Forbidden` responses.

### 2. CRUD Operations Verification
* Verified successful database insertions, updates, reads, and cascade deletions for `Users`, `Products`, `Categories`, and `Courses`.
* Data validation constraints (e.g. unique emails, non-negative prices, valid foreign keys) are enforced successfully.

### 3. Integration Testing
* **Frontend to Gateway**: React components communicate successfully with FastAPI.
* **Gateway to Backend**: FastAPI forwards requests to Spring Boot with auth headers preserved.
* **Backend to Database**: Spring Boot JPA repository performs correct transactional mappings with PostgreSQL.

---

## 📈 DSEDBD Review-1 Rubric Mapping

| Module / Requirement | Completed Status | Verification Notes |
| :--- | :---: | :--- |
| **Frontend UI** | ✅ Completed | Dashboards, search interfaces, and login views fully functional. |
| **FastAPI Gateway** | ✅ Completed | Routing rules configured, endpoints grouped and transparently forwarded. |
| **Spring Security** | ✅ Completed | Filter chain setup intercepts all restricted REST calls. |
| **JWT Authentication**| ✅ Completed | Secure tokens issued and verified. |
| **RBAC** | ✅ Completed | Role validations for `ADMIN` and `USER` operate successfully. |
| **CRUD Operations** | ✅ Completed | Complete CRUD controllers and repository layers fully functional. |
| **PostgreSQL** | ✅ Completed | Database tables configured with primary/foreign keys and indexes. |
| **System Integration**| ✅ Completed | End-to-end payload routing is functional. |
| **Git Collaboration** | ✅ Completed | Remote repository established with continuous code history tracking. |

---

## 🏁 Conclusion & Project Status

The **Multi-Category Search and Filter Platform** successfully fulfills all design and functional objectives required for the **DSEDBD Review-1** milestone. The full-stack integration demonstrates excellent performance, secure user boundaries, robust data management, and standard microservices-style communication patterns.

### Review-1 Checklist
- [x] React & Vite Frontend Completed
- [x] FastAPI Gateway Routing Completed
- [x] Spring Boot API & JPA Mapping Completed
- [x] Spring Security & JWT Filter Completed
- [x] Role-Based Access Control (RBAC) Verified
- [x] PostgreSQL Relational Schema Configured
- [x] Complete System Integration Tested
- [x] Review-1 Ready for Evaluator Assessment
