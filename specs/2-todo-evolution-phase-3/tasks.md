---
description: "Task list template for feature implementation"
---

# Tasks: Evolution of Todo - Phase 3

**Input**: Design documents from `/specs/2-todo-evolution-phase-3/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Test tasks are included as requested by the plan.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

## Path Conventions

- **Web app**: `backend/app/`, `frontend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and structure updates for Phase 3

- [x] T001 [P] Install dependencies: `@clerk/nextjs` (frontend), `framing-motion` (frontend), `httpx` (backend)
- [x] T002 Configure `backend/.env` with `CLERK_ISSUER_URL`
- [x] T003 Configure `frontend/.env.local` with Clerk Publishable Key and Secret Key, and Clerk URLs
- [x] T004 [P] Update `tailwind.config.ts` to include custom colors/gradients for glassmorphism

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for Authentication and UI

**⚠️ CRITICAL**: Must complete before user stories

- [x] T005 [P] Create `backend/app/core/config.py` to load new env vars
- [x] T006 Refactor `backend/app/core/security.py` to implement Clerk JWT verification using `PyJWT` and JWKS
- [x] T007 Update `backend/app/api/deps.py` to use the new Clerk verification logic for `get_current_user`
- [x] T008 [P] Create `frontend/src/middleware.ts` to protect routes using `@clerk/nextjs/server`
- [x] T009 Wrap root layout in `frontend/src/app/layout.tsx` with `<ClerkProvider>`
- [x] T010 Create `frontend/src/components/ui/glass-card.tsx` (Glassmorphism container component)
- [x] T011 Create `frontend/src/components/ui/glass-button.tsx` (Glassmorphism button component)

**Checkpoint**: App builds, Clerk Provider is active, Backend can verify tokens.

---

## Phase 3: User Story 1 - Secure User Onboarding (Priority: P1) 🎯 MVP

**Goal**: Users can sign up and log in via Clerk with a polished UI.

**Independent Test**: Verify redirection to Clerk hosted pages and callback to dashboard.

### Implementation for User Story 1

- [x] T012 [US1] Create `frontend/src/app/sign-in/[[...sign-in]]/page.tsx` with `<SignIn />` component
- [x] T013 [US1] Create `frontend/src/app/sign-up/[[...sign-up]]/page.tsx` with `<SignUp />` component
- [x] T014 [US1] Update `frontend/src/app/page.tsx` (Landing) to use Glass components and link to Sign In/Up
- [x] T015 [US1] Create `frontend/src/app/dashboard/layout.tsx` with a Glassmorphism Navbar showing `<UserButton />`
- [x] T016 [US1] Create basic `frontend/src/app/dashboard/page.tsx` ensuring it's protected by middleware

**Checkpoint**: User can flow from Landing -> Sign Up -> Dashboard (Empty).

---

## Phase 4: User Story 2 - Personalized Todo Management (Priority: P1)

**Goal**: Authenticated users manage their private todos.

**Independent Test**: CRUD operations work and are scoped to the logged-in user.

### Implementation for User Story 2

- [x] T017 [US2] Update `backend/app/models/todo.py` if needed (ensure `user_id` is string for Clerk ID)
- [x] T018 [US2] Refactor `backend/app/api/endpoints/todos.py` to use `sub` from Clerk token as `user_id`
- [x] T019 [US2] Update `frontend/src/lib/api.ts` to attach Clerk token from `useAuth().getToken()` to requests
- [x] T020 [US2] Refactor `frontend/src/components/todo-list.tsx` to use GlassCard style
- [x] T021 [US2] Refactor `frontend/src/components/todo-item.tsx` to use Glass style and animation
- [x] T022 [US2] Refactor `frontend/src/components/todo-form.tsx` to use Glass input style
- [x] T023 [US2] Integrate updated Todo components into `frontend/src/app/dashboard/page.tsx`

**Checkpoint**: Full functional parity with Phase 2, but using Clerk + Glass UI.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final UI polish and code cleanup

- [ ] T024 [P] Add `framer-motion` animations to Todo list items (entry/exit)
- [ ] T025 [P] Verify accessibility (contrast ratios on glass backgrounds)
- [x] T026 [P] Remove old Better Auth code and dependencies (`better-auth`)
- [ ] T027 Run full lint check and type check

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup. Blocks User Stories.
- **User Stories (Phase 3 & 4)**: 
  - US1 (Onboarding) blocks US2 (Todos) functionally because you need a user to have todos.
  - Implementation can be parallel if backend mocks auth, but sequential is safer for this scope.

### Implementation Strategy

1. **Setup**: Install new libs.
2. **Foundation**: Swap the "Auth Engine" (Backend verification logic + Frontend Provider).
3. **US1**: Build the "Auth UI" (Pages + Navbar).
4. **US2**: Connect the "Feature" (Todos) to the new Auth Engine and UI style.
5. **Polish**: Make it smooth.