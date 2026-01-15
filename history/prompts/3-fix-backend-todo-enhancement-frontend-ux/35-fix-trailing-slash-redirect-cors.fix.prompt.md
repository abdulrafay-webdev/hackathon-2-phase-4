---
id: 35
title: Fix Trailing Slash Redirect CORS
stage: fix
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 3-fix-backend-todo-enhancement-frontend-ux
branch: 3-fix-backend-todo-enhancement-frontend-ux
user: developer
command: general
labels: [fix, backend, cors, redirect]
links:
  spec: specs/3-fix-backend-todo-enhancement-frontend-ux/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/app/api/endpoints/todos.py
tests:
  - N/A
---

## Prompt

CORS error: "redirected from 'http://localhost:8000/api/v1/todos'".

## Response snapshot

The frontend calls `/todos` (no slash).
The backend defined `@router.get("/")` which, combined with prefix `/todos`, makes `/todos/`.
FastAPI automatically redirects `/todos` -> `/todos/` with a 307.
However, the redirect response often lacks CORS headers (or the browser blocks the redirected request's preflight).
**Fix**: Changed `@router.get("/")` to `@router.get("")` in `endpoints/todos.py`. This tells FastAPI to serve `/todos` directly without the trailing slash.

## Outcome

- ✅ Impact: Removed the redirect causing the CORS block.
- 🧪 Tests: N/A.
- 📁 Files: Modified endpoints/todos.py.
- 🔁 Next prompts: User needs to restart backend.
- 🧠 Reflection: This is a very common FastAPI pitfall when using `APIRouter` prefixes.

## Evaluation notes (flywheel)

- Failure modes observed: CORS error on 307 Redirect.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
