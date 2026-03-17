# 🚀 SkillHub - Microservices Portfolio Platform

A modern, cloud-native microservices platform built with Spring Boot and React, designed to showcase developer skills, projects, and enable professional networking.

---

## 📋 Table of Contents

- [System Architecture](#-system-architecture)
- [What We Have Built](#-what-we-have-built-so-far)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Future Roadmap](#-future-roadmap)
- [Project Structure](#-project-structure)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│          • User Interface                                    │
│          • Authentication Context                            │
│          • Protected Routes                                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              API Gateway (Spring Cloud Gateway)              │
│          • Central Entry Point                               │
│          • Dynamic Routing                                   │
│          • JWT Header Forwarding                             │
│          • Load Balancing                                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│          Eureka Discovery Server (Netflix Eureka)            │
│          • Service Registration                              │
│          • Service Discovery                                 │
│          • Health Monitoring                                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    User Service                              │
│          • User Authentication (JWT)                         │
│          • User Registration                                 │
│          • Role-Based Access Control (RBAC)                  │
│          • Email OTP Verification                            │
│          • Password Hashing (BCrypt)                         │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ What We Have Built So Far

### 🔐 1. Identity & Authentication Layer (user-service)

**Our strongest component** — A complete authentication and authorization system.

#### Features Implemented:
- ✅ User registration with validation
- ✅ Secure login with JWT (JSON Web Tokens)
- ✅ Password hashing using BCrypt
- ✅ Role-based access control:
  - `ROLE_STUDENT` (default role)
  - `ROLE_ADMIN` (administrative access)
- ✅ Email-based OTP (One-Time Password) verification
- ✅ User profile management
- ✅ Stateless authentication for microservices scalability

#### Why This Matters:
JWT provides **stateless authentication**, meaning:
- No session storage required on the server
- Perfect for distributed microservices
- Each service can independently verify tokens
- Horizontal scaling without session replication

---

### 🌐 2. API Gateway Layer (api-gateway)

**Central routing and security checkpoint** for all client requests.

#### Features Implemented:
- ✅ Single entry point for all microservices
- ✅ Dynamic service discovery via Eureka
- ✅ Intelligent routing to backend services
- ✅ JWT token forwarding to downstream services
- ✅ CORS configuration for frontend integration
- ✅ Load balancing across service instances

#### Real-World Bug Fixed:
- **Problem**: API Gateway was blocking JWT tokens
- **Solution**: Configured `permitAll()` for auth endpoints + proper header forwarding
- **Impact**: This is exactly how production systems handle authentication at the gateway level

---

### 🧭 3. Service Discovery (discovery-server)

**Netflix Eureka** for dynamic service registration and discovery.

#### Features Implemented:
- ✅ Automatic service registration
- ✅ Dynamic service discovery (no hardcoded URLs)
- ✅ Health checks via Spring Boot Actuator
- ✅ Service instance management
- ✅ Fault-tolerant service lookup

#### Why This Is Critical:
- Services can scale up/down dynamically
- No manual IP/port configuration needed
- True cloud-native behavior
- Self-healing service mesh

---

### 🎨 4. Frontend Integration (skillhub-frontend)

**Modern React application** with full authentication flow.

#### Features Implemented:
- ✅ React 19 with Vite for fast development
- ✅ Tailwind CSS for styling
- ✅ React Router for navigation
- ✅ Authentication Context (global auth state)
- ✅ Axios interceptor (auto-attach JWT to requests)
- ✅ Protected routes (private pages)
- ✅ Responsive UI with Framer Motion animations
- ✅ Toast notifications for user feedback

#### Integration Points:
- Frontend → API Gateway → User Service
- Automatic JWT token management
- Seamless user experience

---

## 🔥 Big Picture of What We've Achieved

| Component | Status | Description |
|-----------|--------|-------------|
| ✅ **Stateless Authentication** | Complete | JWT-based auth across all services |
| ✅ **Secure API Access** | Complete | RBAC with Spring Security |
| ✅ **Microservice Routing** | Complete | Gateway-based intelligent routing |
| ✅ **Dynamic Discovery** | Complete | Eureka service registry |
| ✅ **Frontend-Backend Integration** | Complete | Full-stack React + Spring Boot |
| ✅ **Email Verification** | Complete | OTP-based email verification |

**This is an industry-level microservices foundation!**

---

## 🛠️ Technology Stack

### Backend (Microservices)
- **Java 21** - Modern Java with latest features
- **Spring Boot 3.5.7** - Enterprise application framework
- **Spring Cloud 2025.0.0** - Microservices infrastructure
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database access layer
- **MySQL** - Relational database
- **JWT (JJWT 0.12.6)** - Token-based authentication
- **Netflix Eureka** - Service discovery
- **Spring Cloud Gateway** - API gateway
- **Spring Boot Actuator** - Health monitoring
- **Lombok** - Reduce boilerplate code
- **JavaMailSender** - Email functionality

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS 4** - Utility-first CSS
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animation library
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

### Build Tools
- **Maven** - Backend dependency management
- **npm** - Frontend package management

---

## 🚀 Getting Started

### Prerequisites
- Java 21 or higher
- Node.js 18+ and npm
- MySQL Server
- Maven 3.8+

### 1. Start Eureka Discovery Server
```bash
cd discovery-server
mvn spring-boot:run
```
Eureka Dashboard: `http://localhost:8761`

### 2. Start User Service
```bash
cd user-service
# Configure MySQL connection in application.properties
mvn spring-boot:run
```
User Service: `http://localhost:8081`

### 3. Start API Gateway
```bash
cd api-gateway
mvn spring-boot:run
```
API Gateway: `http://localhost:8080`

### 4. Start Frontend
```bash
cd skillhub-frontend
npm install
npm run dev
```
Frontend: `http://localhost:5173`

---

## 🚀 Future Roadmap

### 🌱 Phase 1 — Core Domain Expansion

#### 1. `project-service` (Next Priority)
**Purpose**: Core feature service for managing user projects

**Responsibilities**:
- Create, read, update, delete projects
- Link projects to users (via `userId`)
- Project visibility settings (public/private)
- Project tags and categories

**What We'll Learn**:
- Service-to-service communication
- Data ownership in microservices
- Microservice boundaries and isolation
- RESTful API design patterns

#### 2. `skill-service`
**Purpose**: Manage skills and endorsements

**Responsibilities**:
- CRUD operations for skills (Java, React, Kubernetes, etc.)
- Users can add skills to their profile
- Skill endorsements (peer validation)
- Skill categories and proficiency levels

**What We'll Learn**:
- Many-to-many relationships in distributed systems
- Cross-service data linking
- Aggregation patterns

#### 3. `comment-service`
**Purpose**: Comments and feedback system

**Responsibilities**:
- Comments on projects
- Nested replies (optional)
- Comment moderation
- Like/reaction system

**What We'll Learn**:
- Nested data structures
- Ownership and authorization design
- Event-driven possibilities

#### 4. `notification-service`
**Purpose**: Centralized notification system

**Responsibilities**:
- Email notifications
- In-app notifications
- Notification preferences
- Event-based triggers

**Migration Opportunity**:
- Move existing OTP email logic from user-service here
- Create a unified notification system

---

### ⚙️ Phase 2 — Service Communication Evolution

**Current State**: Synchronous REST calls between services

**Future Enhancements**:

#### Option 1: Feign Client (Easier)
- Declarative REST client
- Load balancing built-in
- Better error handling
```java
@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/users/{id}")
    UserDto getUser(@PathVariable String id);
}
```

#### Option 2: Apache Kafka (Advanced)
- Asynchronous event-driven communication
- Publish-subscribe pattern
- Event sourcing capabilities
```
Event: User Created → Project Service reacts → Notification Service sends welcome email
```

---

### 🌐 Phase 3 — Gateway Evolution

**Current**: Basic routing only

**Future Additions**:
- ✨ Rate limiting (prevent API abuse)
- ✨ Request/response logging
- ✨ Distributed tracing (Spring Cloud Sleuth + Zipkin)
- ✨ Circuit breaker (Resilience4j)
- ✨ API versioning
- ✨ Request transformation

---

### 🧠 Phase 4 — Data & Ownership Design

**Microservices Database Pattern**:

Each microservice **owns its database** — this is critical for loose coupling.

```
user-service     → users_db (MySQL)
project-service  → projects_db (MySQL)
skill-service    → skills_db (MySQL)
comment-service  → comments_db (PostgreSQL)
```

**Key Principle**: Never directly access another service's database!

**Cross-Service Data Access**:
- Use REST APIs or message queues
- Cache frequently accessed data
- Implement API composition patterns

---

### 🎨 Phase 5 — Frontend Evolution

**Current**: Authentication and basic profile

**Next Features**:
- 📊 User dashboard
- 🖼️ Project showcase page
- ➕ Create/edit project UI
- 🏆 Skill management interface
- 👍 Skill endorsement system
- 💬 Comment sections
- 🔔 Notification center
- 🔍 Search and filter functionality

---

### 🔥 Phase 6 — Cloud Native Enhancements

**Deploy to Production** (only after core microservices are complete):

#### Containerization
- 🐳 Dockerize all microservices
- 📦 Docker Compose for local orchestration
- 🐙 Kubernetes manifests for production

#### CI/CD Pipeline
- 🔄 GitHub Actions / Jenkins
- 🧪 Automated testing
- 🚀 Automated deployments
- 🏷️ Semantic versioning

#### Observability Stack
- 📊 Prometheus (metrics collection)
- 📈 Grafana (visualization)
- 🔍 ELK Stack (logging)
- 📡 Zipkin/Jaeger (distributed tracing)

#### Infrastructure
- ☸️ Kubernetes deployment
- ⚖️ Auto-scaling policies
- 🔒 Secret management (Vault)
- 🌍 Cloud deployment (AWS/GCP/Azure)

---

## 📁 Project Structure

```
SkillHub/
├── discovery-server/          # Eureka service registry
│   ├── src/main/java/
│   │   └── com/skillhub/server/
│   └── pom.xml
│
├── api-gateway/               # Spring Cloud Gateway
│   ├── src/main/java/
│   │   └── com/skillhub/gateway/
│   │       ├── config/
│   │       │   ├── SecurityConfig.java
│   │       │   ├── AuthHeaderForwarder.java
│   │       │   └── GlobalCorsConfig.java
│   │       └── ApiGatewayApplication.java
│   └── pom.xml
│
├── user-service/              # Authentication & user management
│   ├── src/main/java/
│   │   └── com/skillhub/user/
│   │       ├── model/
│   │       │   ├── User.java
│   │       │   └── Otp.java
│   │       ├── repository/
│   │       │   ├── UserRepository.java
│   │       │   └── OtpRepository.java
│   │       ├── service/
│   │       │   ├── UserService.java
│   │       │   ├── JwtService.java
│   │       │   ├── EmailService.java
│   │       │   └── OtpService.java
│   │       ├── controller/
│   │       │   ├── UserController.java
│   │       │   └── OtpController.java
│   │       ├── config/
│   │       │   ├── SecurityConfig.java
│   │       │   └── JwtAuthFilter.java
│   │       ├── dto/
│   │       │   ├── RegisterDto.java
│   │       │   ├── LoginDto.java
│   │       │   └── UserDto.java
│   │       └── UserServiceApplication.java
│   └── pom.xml
│
├── skillhub-frontend/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md                  # This file
```

---

## 🎯 Clean Development Roadmap

### ✅ **Completed**
1. User Service (Auth + JWT + RBAC + OTP)
2. API Gateway (Routing + Security)
3. Eureka Discovery Server
4. Frontend Authentication Flow

### 🔜 **Immediate Next Steps**
1. Build `project-service`
2. Add gateway routes for project service
3. Create frontend UI for projects

### 🔜 **After That**
4. Implement `skill-service`
5. Build `comment-service`
6. Add frontend features for skills and comments

### 🔜 **Advanced Features**
7. Implement `notification-service`
8. Migrate to async communication (Kafka)
9. Add distributed tracing

### 🔜 **Production Ready**
10. Dockerize all services
11. Kubernetes deployment
12. CI/CD pipelines
13. Monitoring and observability

---

## 📝 Key Architectural Decisions

### 1. Why JWT?
- **Stateless**: No session storage needed
- **Scalable**: Works perfectly with multiple service instances
- **Secure**: Cryptographically signed tokens
- **Self-contained**: All user info in the token

### 2. Why Microservices?
- **Independent deployment**: Update services without affecting others
- **Technology flexibility**: Use different tech stacks per service
- **Scalability**: Scale services independently based on load
- **Team autonomy**: Different teams can own different services

### 3. Why API Gateway?
- **Single entry point**: Simplifies client integration
- **Security**: Centralized authentication/authorization
- **Routing**: Intelligent traffic management
- **Cross-cutting concerns**: Logging, monitoring, rate limiting in one place

### 4. Why Eureka?
- **Dynamic discovery**: No hardcoded service URLs
- **Self-healing**: Automatic service registration/deregistration
- **Load balancing**: Built-in client-side load balancing
- **Cloud-native**: Essential for containerized environments

---

## 🤝 Contributing

This is a learning project demonstrating microservices architecture patterns. Future enhancements will follow the roadmap outlined above.

---

## 📄 License

This project is built for educational and portfolio purposes.

---

## 👨‍💻 Author

Built with 🔥 by someone who understands that **real backend architects don't build randomly — they engineer systems!**

---

**Next Step**: Build the `project-service` and continue expanding the microservices ecosystem! 🚀
