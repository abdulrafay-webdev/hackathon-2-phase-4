---
id: 16
title: Fix Pydantic V2 Compatibility
stage: fix
date: 2026-01-06
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 2-todo-evolution-phase-3
branch: 2-todo-evolution-phase-3
user: developer
command: general
labels: [fix, backend, pydantic, crash]
links:
  spec: specs/2-todo-evolution-phase-3/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/requirements.txt
  - backend/app/core/config.py
tests:
  - N/A
---

## Prompt

issue still same (Backend failing to start)

## Response snapshot

Identified that `BaseSettings` was moved to `pydantic-settings` in Pydantic v2, causing an ImportError that crashes the backend silently (or visibly if the user checked logs).
1. Updated `requirements.txt` with `pydantic-settings`, `python-dotenv`, and `httpx`.
2. Updated `app/core/config.py` to import from `pydantic_settings`.

## Outcome

- ✅ Impact: Fixed backend startup crash.
- 🧪 Tests: N/A.
- 📁 Files: Modified requirements.txt and config.py.
- 🔁 Next prompts: User needs to reinstall backend deps and restart.
- 🧠 Reflection: Version skew in Python packages is a common failure mode. `pydantic` v2 breaking changes are a frequent culprit.

## Evaluation notes (flywheel)

- Failure modes observed: ImportError on startup.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
