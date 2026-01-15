---
id: 31
title: Diagnose and Fix Schema Mismatch
stage: fix
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 3-fix-backend-todo-enhancement-frontend-ux
branch: 3-fix-backend-todo-enhancement-frontend-ux
user: developer
command: general
labels: [fix, database, schema, debug]
links:
  spec: specs/3-fix-backend-todo-enhancement-frontend-ux/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/check_schema.py
  - backend/fix_missing_cols.py
tests:
  - N/A
---

## Prompt

POST 500 Internal Server Error (still persisting).

## Response snapshot

1. Added traceback logging to backend to see the real error next time.
2. Ran `check_schema.py` which revealed that `status` and `due_date` columns were MISSING from the database (only `description` was added previously).
3. Created and ran `fix_missing_cols.py` to manually add `status` and `due_date`.

## Outcome

- ✅ Impact: Fixed the underlying schema mismatch causing the 500 error on INSERT.
- 🧪 Tests: Validated via script output.
- 📁 Files: Temporary repair scripts.
- 🔁 Next prompts: User retry.
- 🧠 Reflection: The Alembic migration failed earlier, and my manual fix only addressed `description`. I needed to be more thorough and check ALL new columns.

## Evaluation notes (flywheel)

- Failure modes observed: Schema mismatch (code expected columns that didn't exist).
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
