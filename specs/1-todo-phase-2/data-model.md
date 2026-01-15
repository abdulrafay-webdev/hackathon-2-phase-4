# Data Model: Evolution of Todo - Phase II

## Entities

### User (Inferred/Reference)
Better Auth manages the source of truth for users. The application database may store a local reference if needed for relationships.
- `id`: String (Better Auth UID)
- `email`: String
- `created_at`: DateTime

### Todo
- `id`: Integer/UUID (Primary Key)
- `user_id`: String (Foreign Key to User.id)
- `title`: String (Max 255 chars)
- `is_completed`: Boolean (Default: False)
- `created_at`: DateTime (Default: now)

## Relationships
- **User -> Todo**: One-to-Many. One user can have multiple todos.
- **Todo -> User**: Many-to-One. Each todo belongs to exactly one user.

## Validation Rules
- `title` cannot be empty.
- `user_id` must be present and valid (derived from JWT).
- Users can only access/modify todos where `todo.user_id == current_user.id`.
