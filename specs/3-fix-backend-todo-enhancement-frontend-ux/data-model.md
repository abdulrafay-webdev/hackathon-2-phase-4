# Data Model: Todo App Improvements & Fixes

## Entities

### Todo (Updated)
- `id`: Integer/UUID (Primary Key)
- `user_id`: String (Indexed) - Maps to Clerk `sub`.
- `title`: String (Required, max 255)
- `description`: String (Optional, Text) - **NEW**
- `due_date`: DateTime (Optional) - **NEW**
- `status`: String (Enum: "pending", "completed", default: "pending") - **NEW**
- `created_at`: DateTime (Default: now)
- `updated_at`: DateTime (Default: now, onupdate: now) - **NEW**

## Relationships
- No new relationships.

## Validation Rules
- `status` must be either "pending" or "completed".
- `title` cannot be empty.
