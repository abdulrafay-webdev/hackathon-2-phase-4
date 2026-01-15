---
id: 37
title: Debug Backend 500 Error
stage: fix
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 3-fix-backend-todo-enhancement-frontend-ux
branch: 3-fix-backend-todo-enhancement-frontend-ux
user: developer
command: general
labels: [fix, backend, cors, exception-handler]
links:
  spec: specs/3-fix-backend-todo-enhancement-frontend-ux/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/app/main.py
  - backend/app/core/security.py
tests:
  - N/A
---

## Prompt

POST 500 Internal Server Error (still persisting) with CORS block.

## Response snapshot

The presence of "500 (Internal Server Error)" AND "CORS policy" means the server crashed *so hard* or in such a way that the standard CORS middleware didn't apply to the error response.
1. Added a global `exception_handler` to `main.py` that manually injects CORS headers for 500 errors. This allows the frontend to see the *actual* error message instead of just "Network Error".
2. Updated `security.py` to print the full traceback to the console.

## Outcome

- ✅ Impact: Frontend should now display the specific error message, or at least the console will show it.
- 🧪 Tests: N/A.
- 📁 Files: Modified main.py and security.py.
- 🔁 Next prompts: User needs to restart backend and check the BACKEND terminal for the traceback.
- 🧠 Reflection: The 500 is likely "Connection refused" to Clerk (network/firewall?) or "SSL error". Or maybe the DB connection is still flaky?

## Evaluation notes (flywheel)

- Failure modes observed: CORS masking the real 500 error.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
