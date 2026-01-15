# Implementation Plan: Todo App Improvements & Fixes

**Branch**: `3-fix-backend-todo-enhancement-frontend-ux` | **Date**: 2026-01-07 | **Spec**: [specs/3-fix-backend-todo-enhancement-frontend-ux/spec.md](spec.md)
**Input**: Fix persistent auth issues, enhance data model, and modernize UI.

## Summary
Refactor the backend to reliably extract Clerk IDs from tokens to fix data persistence. Update the `Todo` database schema to include `description`, `due_date`, and `status`. Redesign the frontend using Tailwind CSS for a modern, responsive, glassmorphism-inspired look, including status badges and improved forms.

## Technical Context

**Language/Version**: Python 3.11+, TypeScript 5.x  
**Primary Dependencies**: 
- **Frontend**: `@clerk/nextjs`, `tailwindcss` (already installed), `date-fns` (for date formatting)
- **Backend**: `fastapi`, `sqlmodel`, `alembic` (for migrations)
**Storage**: PostgreSQL (Neon)  
**Testing**: Manual verification + Pytest (if available)  
**Target Platform**: Vercel (Frontend & Backend)  
**Project Type**: Monorepo (Web application)  
**Performance Goals**: UI rendering < 100ms, API < 200ms  
**Constraints**: Must not lose existing data (if any valuable data exists, though currently it disappears). Strict Clerk ID mapping.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict Documentation Adherence**: Clerk ID extraction follows standard claims (`sub`).
- [x] **Modern Frontend Standards**: Tailwind + Glassmorphism specified for UI overhaul.
- [x] **Clean Backend Architecture**: Schema changes via SQLModel.
- [x] **Secure Authentication**: Clerk remains the auth provider.

## Project Structure

### Documentation (this feature)

```text
specs/3-fix-backend-todo-enhancement-frontend-ux/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── models/          # Update todo.py
│   ├── api/             # Update endpoints/todos.py
│   └── alembic/         # Add migration scripts
frontend/
├── src/
│   ├── components/      # Update/Create UI components
│   └── app/             # Update pages
```

**Structure Decision**: Modify existing files. Add Alembic for migrations to handle schema changes safely.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Alembic Migrations | Changing DB schema (adding columns) | `SQLModel.metadata.create_all` doesn't handle updates/alterations well for existing tables |
