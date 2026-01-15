# Research: Todo App Improvements & Fixes

## Decision: Clerk User ID Persistence
- **Decision**: Use the `sub` claim from the decoded JWT as the immutable `user_id`.
- **Rationale**: The `sub` claim in Clerk tokens is the stable User ID. The issue of disappearing todos is likely due to inconsistent use of this ID or a session token rotation issue where the backend wasn't decoding it correctly or using a temporary ID.
- **Verification**: Will log the `sub` claim on backend to verify consistency across logins.

## Decision: Database Schema Migration
- **Decision**: Use `alembic` for schema migrations.
- **Rationale**: Adding columns (`description`, `due_date`, `status`) to an existing table requires migration scripts to avoid data loss and ensure database integrity.
- **Alternatives considered**: 
    - Drop and recreate tables (Rejected: Data loss, unprofessional).
    - Manual SQL (Rejected: Error-prone, hard to track).

## Decision: UI Framework
- **Decision**: Refactor existing components to fully utilize Tailwind CSS with a custom "glass" utility set.
- **Rationale**: Current UI is "basic". Glassmorphism requires specific transparency and blur settings which are best managed via Tailwind config.

## Resolved Clarifications
- **Clerk Keys**: Existing keys in `.env` are assumed valid (system is running, just buggy).
