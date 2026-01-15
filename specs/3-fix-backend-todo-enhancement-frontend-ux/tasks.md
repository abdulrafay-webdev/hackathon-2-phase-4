---
description: "Task list template for feature implementation"
---

# Tasks: Todo App Improvements & Fixes

**Input**: Design documents from `/specs/3-fix-backend-todo-enhancement-frontend-ux/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Test tasks are included as requested by the plan.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

## Path Conventions

- **Web app**: `backend/app/`, `frontend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and structure updates

- [ ] T001 [P] Install `alembic` in backend for migrations
- [ ] T002 Initialize Alembic with `alembic init alembic` in `backend/`
- [ ] T003 Configure `alembic.ini` and `backend/alembic/env.py` to use SQLModel and `DATABASE_URL` from env
- [ ] T004 [P] Install `date-fns` in frontend for date formatting

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure fixes and schema updates

**⚠️ CRITICAL**: Must complete before user stories

- [ ] T005 [P] Update `backend/app/models/todo.py` to include new fields: `description`, `due_date`, `status`, `updated_at`
- [ ] T006 Generate Alembic migration script for new schema
- [ ] T007 Apply Alembic migration to update database
- [ ] T008 [P] Add logging to `backend/app/core/security.py` to verify `sub` claim extraction (if not already present)

**Checkpoint**: Database schema updated, migrations working.

---

## Phase 3: User Story 1 - Reliable Authentication & Persistence (Priority: P1) 🎯 MVP

**Goal**: Fix the bug where todos disappear after logout.

**Independent Test**: Create todo -> Logout -> Login -> Verify todo persists.

### Implementation for User Story 1

- [ ] T009 [US1] Verify `backend/app/api/deps.py` correctly passes `sub` as `user_id`
- [ ] T010 [US1] Audit `backend/app/api/endpoints/todos.py` to ensure `user_id` is NEVER taken from request body, ONLY from token
- [ ] T011 [US1] Add explicit unit test (or manual verification step) for `user_id` consistency

**Checkpoint**: Data persistence confirmed.

---

## Phase 4: User Story 2 - Enhanced Todo Management (Priority: P2)

**Goal**: Support description, due date, and status.

**Independent Test**: Create todo with details, update status.

### Implementation for User Story 2

- [ ] T012 [US2] Update `backend/app/api/endpoints/todos.py` POST endpoint to accept new fields
- [ ] T013 [US2] Update `backend/app/api/endpoints/todos.py` PATCH endpoint to allow updating new fields
- [ ] T014 [US2] Add PATCH `/todos/{id}/status` endpoint for quick toggling
- [ ] T015 [US2] Update `frontend/src/lib/api.ts` types to match new Todo schema

**Checkpoint**: API supports full schema.

---

## Phase 5: User Story 3 - Professional UI/UX (Priority: P2)

**Goal**: Modern Glassmorphism UI with Tailwind.

**Independent Test**: Visual inspection of cards, badges, and responsiveness.

### Implementation for User Story 3

- [ ] T016 [US3] Create `frontend/src/components/ui/status-badge.tsx` component
- [ ] T017 [US3] Update `frontend/src/components/todo-form.tsx` to include fields for Description and Due Date using Glass inputs
- [ ] T018 [US3] Update `frontend/src/components/todo-item.tsx` to display new fields and Status Badge
- [ ] T019 [US3] Add "Mark Complete" / "Undo" buttons to `todo-item.tsx` connecting to new API endpoints
- [ ] T020 [US3] Refactor `frontend/src/app/dashboard/page.tsx` grid layout for responsiveness

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final UI polish and code cleanup

- [ ] T021 [P] Ensure dates are formatted user-friendly using `date-fns`
- [ ] T022 [P] Add loading skeletons for Todo List
- [ ] T023 Run final linting and cleanup

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup. Blocks User Stories.
- **User Stories (Phase 3, 4, 5)**: 
  - US1 (Fix Persistence) is highest priority.
  - US2 (Backend Schema) must happen before US3 (Frontend UI) updates.

### Implementation Strategy

1. **Setup & Foundation**: Get DB schema ready.
2. **US1**: Fix the bug.
3. **US2**: Update API.
4. **US3**: Update UI.
5. **Polish**: Make it shine.
