# API Contracts: Evolution of Todo - Phase 3

## Base URL
`http://localhost:8000/api/v1`

## Authentication
Header: `Authorization: Bearer <clerk_session_token>`

## Endpoints

### 1. GET /todos
- **Auth**: Required.
- **Logic**: Extract `sub` (user_id) from token. Return `SELECT * FROM todo WHERE user_id = :sub`.
- **Response**: List of Todos.

### 2. POST /todos
- **Auth**: Required.
- **Body**: `{"title": "string"}`
- **Logic**: Insert into DB with `user_id` from token.
- **Response**: Created Todo.

### 3. PATCH /todos/{id}
- **Auth**: Required.
- **Logic**: Verify ownership (`user_id` matches token). Update fields.
- **Response**: Updated Todo.

### 4. DELETE /todos/{id}
- **Auth**: Required.
- **Logic**: Verify ownership. Delete.
- **Response**: 204 No Content.
