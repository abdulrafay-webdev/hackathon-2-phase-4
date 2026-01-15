# API Contracts: Todo App Improvements & Fixes

## Base URL
`http://localhost:8000/api/v1`

## Endpoints

### 1. GET /todos
- **Response**: List of Todos with new fields (`description`, `due_date`, `status`).

### 2. POST /todos
- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Optional details",
    "due_date": "2023-12-31T23:59:59Z"
  }
  ```
- **Response**: Created Todo (status defaults to "pending").

### 3. PATCH /todos/{id}
- **Request Body**: (Partial)
  ```json
  {
    "title": "Updated Title",
    "description": "Updated details",
    "due_date": null,
    "status": "completed"
  }
  ```
- **Response**: Updated Todo.

### 4. PATCH /todos/{id}/status
- **Request Body**:
  ```json
  {
    "status": "completed"
  }
  ```
- **Response**: Updated Todo.
