# API Contracts: Evolution of Todo - Phase II

## Base URL
`http://localhost:8000/api/v1`

## Authentication
All endpoints (except Health Check) require a Bearer Token in the `Authorization` header.
`Authorization: Bearer <JWT_TOKEN>`

## Endpoints

### 1. GET /todos
List all todos for the authenticated user.
- **Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "title": "Buy milk",
      "is_completed": false,
      "created_at": "2026-01-06T12:00:00Z"
    }
  ]
  ```

### 2. POST /todos
Create a new todo.
- **Request Body**:
  ```json
  {
    "title": "Sample Todo"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "id": 2,
    "title": "Sample Todo",
    "is_completed": false,
    "created_at": "2026-01-06T12:05:00Z"
  }
  ```

### 3. PATCH /todos/{id}
Update a todo (e.g., mark as completed).
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "is_completed": true
  }
  ```
- **Response (200 OK)**: Updated object.

### 4. DELETE /todos/{id}
Delete a todo.
- **Response (204 No Content)**
