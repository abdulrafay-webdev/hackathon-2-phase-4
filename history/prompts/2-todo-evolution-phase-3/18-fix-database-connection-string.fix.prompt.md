---
id: 18
title: Fix Database Connection String
stage: fix
date: 2026-01-06
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 2-todo-evolution-phase-3
branch: 2-todo-evolution-phase-3
user: developer
command: general
labels: [fix, backend, database, env]
links:
  spec: specs/2-todo-evolution-phase-3/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/app/core/db.py
tests:
  - N/A
---

## Prompt

sqlalchemy.exc.ArgumentError: Expected string or URL object, got None...

## Response snapshot

Identified that `os.getenv` returns None because `.env` isn't loaded automatically by `os`.
1. Updated `app/core/db.py` to import and call `load_dotenv()`.
2. Added a check to raise `ValueError` if `DATABASE_URL` is still missing.

## Outcome

- ✅ Impact: Fixed server crash on startup due to missing DB URL.
- 🧪 Tests: N/A.
- 📁 Files: Modified app/core/db.py.
- 🔁 Next prompts: User to restart backend.
- 🧠 Reflection: `pydantic-settings` handles env loading if used, but `db.py` was using raw `os.getenv`. Mixing these approaches causes confusion. Explicit `load_dotenv` is safer here.

## Evaluation notes (flywheel)

- Failure modes observed: Missing environment variables.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
