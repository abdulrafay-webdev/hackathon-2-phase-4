# Data Model: Evolution of Todo - Phase 3

## Entities

### User (Reference)
- `id`: String (Clerk Subject ID / `sub`). **Source of Truth**: Clerk.
- The local database MAY store a copy if profiles are needed, but authentication relies on the token.

### Todo
- `id`: Integer/UUID (Primary Key)
- `user_id`: String (Indexed). Matches Clerk `sub` claim.
- `title`: String
- `is_completed`: Boolean
- `created_at`: DateTime

## Relationships
- **User (Clerk) -> Todo (DB)**: One-to-Many.

## Validation Rules
- **Backend**: Every request to `/todos` MUST contain a valid JWT. The `user_id` in the `Todo` table MUST match the `sub` claim in the token for writes/updates.
- **Frontend**: Pages under `/dashboard` are protected by `middleware.ts`.
