# Feature Specification: Todo App Improvements & Fixes

**Feature Branch**: `3-fix-backend-todo-enhancement-frontend-ux`
**Created**: 2026-01-07
**Status**: Draft
**Input**: Fix backend auth persistence, enhance Todo schema, and overhaul frontend UI/UX.

## User Scenarios & Testing

### User Story 1 - Reliable Authentication & Persistence (Priority: P1)
As a user, I want my todos to persist securely across sessions so that I don't lose my data after logging out and back in.

**Why this priority**: Core functionality is currently broken (data loss on logout).

**Independent Test**:
1. Log in -> Create Todo -> Log out -> Log in -> Verify Todo exists.
2. Verify Todo is NOT visible to other users.

**Acceptance Scenarios**:
1. **Given** an authenticated user creates a todo, **When** they log out and log back in, **Then** the todo is still visible.
2. **Given** User A creates a todo, **When** User B logs in, **Then** User B cannot see User A's todo.
3. **Given** a valid session, **When** the user refreshes the page, **Then** the session remains active and data persists.

### User Story 2 - Enhanced Todo Management (Priority: P2)
As a user, I want to add details like descriptions and due dates to my tasks so that I can better organize my work.

**Why this priority**: Current implementation is too basic (title only).

**Independent Test**: Create a todo with title, description, and due date via API/UI and verify all fields are saved.

**Acceptance Scenarios**:
1. **Given** the todo creation form, **When** the user fills in Title, Description, and Due Date, **Then** the new todo is created with status "pending".
2. **Given** an existing pending todo, **When** the user clicks "Complete", **Then** the status updates to "completed".
3. **Given** a completed todo, **When** the user clicks "Undo", **Then** the status reverts to "pending".

### User Story 3 - Professional UI/UX (Priority: P2)
As a user, I want a modern, clean interface so that the application feels professional and easy to use.

**Why this priority**: Current UI is "basic and unprofessional".

**Independent Test**: Visually verify layout against modern standards (cards, badges, spacing).

**Acceptance Scenarios**:
1. **Given** the dashboard, **When** todos are listed, **Then** they appear as cards with distinct visual styles for "pending" vs "completed".
2. **Given** the creation form, **When** opened, **Then** it presents clearly labeled inputs for all fields.
3. **Given** any page, **When** viewed on mobile, **Then** the layout adapts responsively.

## Requirements

### Functional Requirements

- **FR-001**: Backend MUST accurately map Clerk `sub` (subject) claim to `user_id` in the database to ensure persistence.
- **FR-002**: System MUST persist todos indefinitely unless explicitly deleted by the user.
- **FR-003**: Todo Schema MUST include: `title`, `description`, `due_date`, `status` (enum: pending|completed), `user_id`.
- **FR-004**: API POST `/todos` MUST accept title, description, and due_date. Status defaults to "pending".
- **FR-005**: API MUST provide endpoints to toggle status (`PATCH /todos/{id}/status`) or general update (`PATCH /todos/{id}`).
- **FR-006**: Frontend MUST use Tailwind CSS for all styling, implementing a modern card-based layout.
- **FR-007**: UI MUST display status badges (e.g., Green for Completed, Yellow/Gray for Pending).

### Key Entities

- **Todo**:
  - `id`: Integer/UUID (Primary Key)
  - `user_id`: String (Indexed, linked to Clerk ID)
  - `title`: String
  - `description`: String (Optional)
  - `due_date`: DateTime (Optional)
  - `status`: Enum (pending, completed)
  - `created_at`: DateTime
  - `updated_at`: DateTime

## Success Criteria

### Measurable Outcomes

- **SC-001**: Zero data loss reported after logout/login cycle in testing.
- **SC-002**: 100% of created todos have correct `user_id` associated.
- **SC-003**: UI achieves a consistent design system (colors, typography, spacing) using Tailwind CSS.
- **SC-004**: API endpoints for extended fields (description, due_date) return 200 OK and persist data correctly.
