---
description: "Task list template for feature implementation"
---

# Tasks: Local Kubernetes Deployment

**Input**: Design documents from `/specs/5-local-k8s-deploy/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /sp.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Create `backend/.dockerignore` with context optimization rules (venv, git, etc.)
- [x] T002 [P] Create `frontend/.dockerignore` with context optimization rules (node_modules, etc.)
- [x] T003 Create `k8s/helm/todo-app/Chart.yaml` with chart metadata
- [x] T004 Create `k8s/helm/todo-app/values.yaml` with default configuration from data-model.md
- [x] T005 Create `scripts/sync-secrets.sh` to inject local `.env` into Minikube secrets

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Use Gordon/Docker AI to generate optimized `backend/Dockerfile` (multi-stage, non-root, python:3.11-slim)
- [x] T007 Use Gordon/Docker AI to generate optimized `frontend/Dockerfile` (multi-stage, non-root, node:20-alpine)
- [x] T008 [P] Manually verify `backend/Dockerfile` builds successfully with `docker build backend/`
- [x] T009 [P] Manually verify `frontend/Dockerfile` builds successfully with `docker build frontend/`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Local Cluster Initialization (Priority: P1) 🎯 MVP

**Goal**: One-command deploy of the entire stack to Minikube

**Independent Test**: `helm install` results in all pods Running and UI accessible via `minikube service`

### Implementation for User Story 1

- [x] T010 [US1] Create `k8s/helm/todo-app/templates/backend-deployment.yaml` with env vars from Secret
- [x] T011 [US1] Create `k8s/helm/todo-app/templates/backend-service.yaml` (ClusterIP)
- [x] T012 [US1] Create `k8s/helm/todo-app/templates/frontend-deployment.yaml` with env vars for build/runtime
- [x] T013 [US1] Create `k8s/helm/todo-app/templates/frontend-service.yaml` (NodePort)
- [x] T014 [US1] Create `k8s/helm/todo-app/templates/secrets.yaml` or ensure `sync-secrets.sh` integration works
- [x] T015 [US1] Create `k8s/helm/todo-app/templates/configmap.yaml` for non-sensitive config (backend host)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Iterative Development & Updates (Priority: P2)

**Goal**: Enable live updates without full cluster teardown

**Independent Test**: Change UI string -> Build -> Update -> Verify change

### Implementation for User Story 2

- [x] T016 [US2] Update `scripts/sync-secrets.sh` or create `scripts/dev-update.sh` to handle image rebuilds in Minikube env
- [x] T017 [US2] Document Minikube Docker daemon workflow in `README.md` or `docs/local-dev.md`
- [x] T018 [US2] Verify `helm upgrade` picks up new image tags (ensure `latest` or sha handling in values.yaml)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Infrastructure Resilience & Scaling (Priority: P3)

**Goal**: Verify stateless architecture and resilience

**Independent Test**: Delete backend pod -> New one starts -> Data persists

### Implementation for User Story 3

- [x] T019 [US3] Add `livenessProbe` and `readinessProbe` to `k8s/helm/todo-app/templates/backend-deployment.yaml`
- [x] T020 [US3] Add `livenessProbe` and `readinessProbe` to `k8s/helm/todo-app/templates/frontend-deployment.yaml`
- [x] T021 [US3] Add `resources` (requests/limits) block to `values.yaml` and deployment templates
- [x] T022 [US3] Create `k8s/tests/verify-resilience.sh` script to automate pod deletion and recovery check

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T023 [P] Add `helm lint` and `helm template` verification step to CI/CD docs
- [x] T024 Update project `README.md` with "Running in Kubernetes" section linking to quickstart
- [x] T025 Security audit of generated Dockerfiles (ensure no root user, minimal layers)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Extends workflow from US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Modifies US1 templates for resilience

### Within Each User Story

- Helm templates before Services
- Services before Ingress/Access
- Story complete before moving to next priority

### Parallel Opportunities

- Dockerfile generation (T006, T007) can run in parallel
- Manual Docker builds (T008, T009) can run in parallel
- Backend and Frontend Helm templates (T010 vs T012) can be written in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (Docker images)
3. Complete Phase 3: User Story 1 (Basic Helm Chart)
4. **STOP and VALIDATE**: `helm install` works
5. Deploy/demo if ready

### Incremental Delivery

1. Foundation ready (Images built)
2. Add US1 (Basic Deploy) -> Verify
3. Add US2 (Dev Workflow) -> Verify
4. Add US3 (Probes/Resilience) -> Verify

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Helm Structure)
   - Developer B: User Story 3 (Probes - can draft snippets)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
