---
description: "Task list template for feature implementation"
---

# Tasks: Evolution of Todo - Phase II

**Input**: Design documents from `/specs/1-todo-phase-2/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/app/`, `frontend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create monorepo structure with `backend/` and `frontend/` folders
- [x] T002 Initialize FastAPI project in `backend/` with `requirements.txt` containing FastAPI, Uvicorn, SQLModel, Pydantic, PyJWT, Psycopg2-binary
- [x] T003 Initialize Next.js project in `frontend/` with TypeScript and Tailwind CSS
- [x] T004 [P] Configure backend `.env` file with `DATABASE_URL`, `BETTER_AUTH_SECRET`
- [x] T005 [P] Configure frontend `.env.local` file with `BETTER_AUTH_SECRET`, `NEXT_PUBLIC_API_URL`
- [x] T006 [P] Configure `ruff` for backend linting/formatting
- [x] T007 [P] Configure `eslint` and `prettier` for frontend

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 Setup SQLModel database connection and engine in `backend/app/core/db.py`
- [x] T009 Create generic `get_session` dependency in `backend/app/api/deps.py`
- [x] T010 Implement JWT verification utility in `backend/app/core/security.py` using `BETTER_AUTH_SECRET` and `HS256`
- [x] T011 Create `get_current_user` dependency in `backend/app/api/deps.py` that parses the JWT token
- [x] T012 Define shared Pydantic models (if any) or base SQLModel classes in `backend/app/models/base.py`
- [x] T013 Setup Better Auth client instance in `frontend/src/lib/auth-client.ts`
- [x] T014 Create API client helper (axios/fetch wrapper) in `frontend/src/lib/api.ts` that attaches the JWT token from Better Auth

**Checkpoint**: Database connected, Auth utilities ready, API client ready.

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Users must be able to securely sign up, log in, and maintain a session using a modern authentication provider.

**Independent Test**: Verify login flow on frontend and protected route access on backend.

### Implementation for User Story 1

- [x] T015 [US1] Create `User` reference model in `backend/app/models/user.py` (if local storage needed, else skip)
- [x] T016 [US1] Implement `/auth/me` or `/users/me` endpoint in `backend/app/api/endpoints/users.py` to verify token validity
- [x] T017 [US1] Create Login page in `frontend/src/app/login/page.tsx` using Better Auth client
- [x] T018 [US1] Create Signup page in `frontend/src/app/signup/page.tsx` using Better Auth client
- [x] T019 [US1] Create a protected "Dashboard" page in `frontend/src/app/dashboard/page.tsx` that redirects if not authenticated
- [x] T020 [US1] Integrate `get_current_user` dependency into `backend/app/main.py` (or router) to protect routes

**Checkpoint**: User can login/signup and access a protected route.

---

## Phase 4: User Story 2 - Todo Management (Priority: P1)

**Goal**: Authenticated users must be able to manage their private todo list with full CRUD capabilities.

**Independent Test**: Verify full CRUD operations for a specific user, ensuring no data leaks between users.

### Implementation for User Story 2

- [x] T021 [US2] Define `Todo` SQLModel in `backend/app/models/todo.py` with `user_id` field
- [x] T022 [US2] Create database migration (or `SQLModel.metadata.create_all`) to create `todo` table
- [x] T023 [US2] Implement `POST /todos` endpoint in `backend/app/api/endpoints/todos.py` (associates with `current_user`)
- [x] T024 [US2] Implement `GET /todos` endpoint in `backend/app/api/endpoints/todos.py` (filters by `current_user`)
- [x] T025 [US2] Implement `PATCH /todos/{id}` endpoint in `backend/app/api/endpoints/todos.py` (checks ownership)
- [x] T026 [US2] Implement `DELETE /todos/{id}` endpoint in `backend/app/api/endpoints/todos.py` (checks ownership)
- [x] T027 [US2] Update `backend/app/api/api.py` to include `todos` router
- [x] T028 [US2] Create Todo list component in `frontend/src/components/todo-list.tsx`
- [x] T029 [US2] Create Todo item component in `frontend/src/components/todo-item.tsx`
- [x] T030 [US2] Create Todo input form in `frontend/src/components/todo-form.tsx`
- [x] T031 [US2] Integrate Todo components into `frontend/src/app/dashboard/page.tsx` fetching data from API

**Checkpoint**: User can Create, Read, Update, and Delete their own todos.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T032 [P] Add proper error handling/alerting in frontend for API failures
- [x] T033 [P] Improve styling of Auth and Todo pages with Tailwind CSS
- [x] T034 Verify strict data isolation (test with two different users)
- [x] T035 Review and clean up code (remove console logs, unused imports)
- [x] T036 Run full build check `npm run build` (frontend) and `ruff check .` (backend)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup. BLOCKS all user stories.
- **User Stories (Phase 3 & 4)**: Depend on Foundational.
  - US1 and US2 are both P1, but US2 depends on Auth (US1) functionally (needs a user to create todos).
  - Implementation-wise, US2 backend can be built assuming a mocked user, but integration requires US1.
  - **Strategy**: Complete US1 (Auth) first, then US2 (Todos).

### Implementation Strategy

1. **Setup**: Get the monorepo and stacks ready.
2. **Foundation**: Build the "plumbing" (DB, Auth utils).
3. **US1 (Auth)**: Prove we can identify a user.
4. **US2 (Todos)**: Build the core feature on top of that identity.
5. **Polish**: Make it look good and ensure it's solid.