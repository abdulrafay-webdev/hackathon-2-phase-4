---
id: 17
title: Fix Missing Crypto Dependencies
stage: fix
date: 2026-01-06
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 2-todo-evolution-phase-3
branch: 2-todo-evolution-phase-3
user: developer
command: general
labels: [fix, backend, pyjwt, crypto]
links:
  spec: specs/2-todo-evolution-phase-3/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/requirements.txt
  - backend/app/core/security.py
tests:
  - N/A
---

## Prompt

issue still same (Failed to add todo, implied 500 error on backend)

## Response snapshot

Diagnosed missing `pyjwt[crypto]` dependency. RS256 token verification requires cryptography library which is not installed by `pyjwt` alone.
1. Updated `requirements.txt`.
2. Added logging to `security.py` to surface future errors.

## Outcome

- ✅ Impact: Fixed potential 500 Internal Server Error on token verification.
- 🧪 Tests: N/A.
- 📁 Files: Modified requirements.txt and security.py.
- 🔁 Next prompts: User needs to reinstall backend deps and restart.
- 🧠 Reflection: RS256 dependency is a classic trap. Always specify [crypto] extra.

## Evaluation notes (flywheel)

- Failure modes observed: Missing optional dependency causing runtime failure.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
