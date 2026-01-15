---
id: 41
title: Align API and Frontend Credentials
stage: fix
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 3-fix-backend-todo-enhancement-frontend-ux
branch: 3-fix-backend-todo-enhancement-frontend-ux
user: developer
command: general
labels: [fix, backend, frontend, axios, credentials, enum]
links:
  spec: specs/3-fix-backend-todo-enhancement-frontend-ux/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/lib/api.ts
  - backend/app/models/todo.py
  - backend/app/api/endpoints/todos.py
tests:
  - N/A
---

## Prompt

(System nudge to continue) - Consolidation of fixes.

## Response snapshot

Applied further fixes to ensure system stability:
1. **Axios Credentials**: Added `withCredentials: true` to `frontend/src/lib/api.ts` as requested.
2. **Enum Alignment**: Changed `TodoStatus` in `todo.py` to use lowercase values (`pending`, `completed`) to match frontend requests and previous hotfixes.
3. **Endpoint Robustness**: Wrapped `mark_complete` in `try-except` with logging.

## Outcome

- ✅ Impact: Improved consistency between frontend and backend.
- 🧪 Tests: N/A.
- 📁 Files: Modified api.ts, todo.py, and todos.py.
- 🔁 Next prompts: User restart and test.
- 🧠 Reflection: Lowercase enums are generally easier to handle in cross-language (TS/Python) projects.

## Evaluation notes (flywheel)

- Failure modes observed: Case mismatch in enum values.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
