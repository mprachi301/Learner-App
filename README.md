# Learning Management System API

A RESTful API built with Node.js, Express, and MySQL for managing courses, enrollments, and user authentication in a learning management system.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs

## Project Structure
src/
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Course.js
│   ├── Enrollment.js
│   └── index.js
├── controllers/
│   ├── authController.js
│   ├── courseController.js
│   └── enrollmentController.js
├── services/
│   ├── authService.js
│   ├── courseService.js
│   └── enrollmentService.js
├── routes/
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   └── enrollmentRoutes.js
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
└── app.js

## Prerequisites

- Node.js
- MySQL

## Getting Started

**1. Clone the repository:**
```bash
git clone <repository-url>
cd lms-api
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create `.env` file in root directory:**
PORT=8000
HOST=localhost
DB_NAME=your_db_name
USERNAME=your_db_username
PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

**4. Create database in MySQL:**
```sql
CREATE DATABASE your_db_name;
```

**5. Start the server:**
```bash
npm run dev
```
Tables will be created automatically on server start.

## API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /auth/register | Register a new user | Public |
| POST | /auth/login | Login and get token | Public |

### Courses
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /courses | Create a course | Admin, Manager |
| GET | /courses | Get all courses | All |
| GET | /courses/:id | Get course by ID | All |
| PUT | /courses/:id | Update a course | Admin, Manager |
| DELETE | /courses/:id | Delete a course | Admin, Manager |

### Enrollments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /enrollment | Enroll in a course | Learner, Manager, Admin |
| GET | /enrollment | Get my enrollments | All |
| PUT | /enrollment/progress | Update progress | Learner, Admin |
| PUT | /enrollment/:id/drop | Drop a course | Learner, Manager, Admin |

## Authentication

All protected routes require a JWT token in the request header:
Authorization: Bearer <your_token>

## Roles

| Role | Description |
|------|-------------|
| admin | Full access to all endpoints |
| manager | Can manage courses and enrollments |
| learner | Can enroll and track their own progress |

## Request & Response Examples

**Register:**
```json
POST /auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "learner"
}
```

**Login:**
```json
POST /auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Create Course:**
```json
POST /courses
{
  "course_name": "Introduction to Sales",
  "description": "Learn the basics of sales",
  "course_type": "sales",
  "course_duration": 60
}
```

**Enroll in Course:**
```json
POST /enrollment
{
  "course_id": 1
}
```

**Update Progress:**
```json
PUT /enrollment/progress
{
  "course_id": 1,
  "progress": 50
}
```

## Error Handling

All errors return a consistent response:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |
