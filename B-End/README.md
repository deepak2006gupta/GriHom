# 🏠 GriHom Backend

Spring Boot 3.3.x REST API backend for GriHom — Smart Home Value Booster.

## 🛠️ Tech Stack

- **Java 21**
- **Spring Boot 3.3.x**
- **Spring Security + JWT**
- **Spring Data JPA + Hibernate**
- **MySQL 8.0**
- **Maven**

## 📋 Prerequisites

- Java 21+
- Maven 3.8+
- MySQL 8.0+

## 🚀 Getting Started

### 1. Database Setup

```sql
CREATE DATABASE grihom_db;
USE grihom_db;
```

### 2. Configure Database Credentials

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.username=your_mysql_user
spring.datasource.password=your_mysql_password
```

### 3. Build & Run

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The API will be available at `http://localhost:8080/api`

## 📁 Project Structure

```
src/
├── main/
│   ├── java/com/grihom/
│   │   ├── model/           (Entity classes)
│   │   ├── repository/      (Database access)
│   │   ├── service/         (Business logic)
│   │   ├── controller/      (REST endpoints)
│   │   ├── dto/             (Data Transfer Objects)
│   │   ├── security/        (JWT & Auth)
│   │   └── GriHomApplication.java  (Main class)
│   └── resources/
│       └── application.properties
└── test/
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user
- `POST /api/auth/logout` — Logout user

### Home Improvements
- `GET /api/improvements` — Get all improvements
- `GET /api/improvements/{id}` — Get improvement by ID
- `GET /api/improvements/category/{category}` — Get by category
- `POST /api/improvements` — Create improvement (Admin)
- `PUT /api/improvements/{id}` — Update improvement (Admin)
- `DELETE /api/improvements/{id}` — Delete improvement (Admin)

### Users
- `GET /api/users/{id}` — Get user profile
- `PUT /api/users/{id}` — Update user profile
- `GET /api/users` — List all users (Admin)

## 🔐 Security

- JWT-based authentication
- Bcrypt password hashing
- Role-based access control (Admin/User)
- CORS configured for React frontend

## 📝 Notes

- Change JWT secret in `application.properties` for production
- Update CORS origins for production deployment
- Database schema is auto-created on first run (ddl-auto=update)
