---
id: 38
title: Hotfix Status Enum Mismatch
stage: fix
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 3-fix-backend-todo-enhancement-frontend-ux
branch: 3-fix-backend-todo-enhancement-frontend-ux
user: developer
command: general
labels: [fix, backend, database, enum]
links:
  spec: specs/3-fix-backend-todo-enhancement-frontend-ux/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/app/models/todo.py
  - backend/app/api/endpoints/todos.py
tests:
  - N/A
---

## Prompt

LookupError: 'pending' is not among the defined enum values.

## Response snapshot

The error confirms a conflict between the Python `Enum` definition (which SQLAlchemy uses to map values) and the actual data/schema in the DB.
Since manual SQL was used to add the column as `VARCHAR` with default `'pending'`, but the Python model was using `sa.Enum`, SQLAlchemy choked on the read.
**Fix**: Temporarily switched the `status` field in `Todo` model to `str` type. This bypasses the strict Enum mapping layer in SQLAlchemy and allows it to simply read/write the string "pending" or "completed", which matches the `VARCHAR` column in the DB.
Updated endpoint logic to check for string `"completed"` instead of `TodoStatus.COMPLETED`.

## Outcome

- ✅ Impact: Unblocks the app by relaxing the strict type check at the DB layer.
- 🧪 Tests: N/A.
- 📁 Files: Modified todo.py and endpoints/todos.py.
- 🔁 Next prompts: User restart backend.
- 🧠 Reflection: In production, we'd do a proper data migration to convert the column to a Postgres ENUM type, but for getting unstuck in dev, treating it as a string is efficient and safe enough.

## Evaluation notes (flywheel)

- Failure modes observed: SQLAlchemy Enum type validation failure on fetch.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
