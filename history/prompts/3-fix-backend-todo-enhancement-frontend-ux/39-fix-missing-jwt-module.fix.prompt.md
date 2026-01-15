---
id: 39
title: Fix Missing jwt Module
stage: fix
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 3-fix-backend-todo-enhancement-frontend-ux
branch: 3-fix-backend-todo-enhancement-frontend-ux
user: developer
command: general
labels: [fix, backend, dependencies, pyjwt]
links:
  spec: specs/3-fix-backend-todo-enhancement-frontend-ux/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/requirements.txt
tests:
  - N/A
---

## Prompt

ModuleNotFoundError: No module named 'jwt'

## Response snapshot

Instructed the user to install `pyjwt[crypto]` to resolve the import error. Explained the difference between the package name and import name.

## Outcome

- ✅ Impact: Resolved backend dependency issue.
- 🧪 Tests: N/A.
- 📁 Files: N/A.
- 🔁 Next prompts: User restart backend.
- 🧠 Reflection: Common confusion between package name `PyJWT` and module name `jwt`.

## Evaluation notes (flywheel)

- Failure modes observed: Missing dependency in runtime environment.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
