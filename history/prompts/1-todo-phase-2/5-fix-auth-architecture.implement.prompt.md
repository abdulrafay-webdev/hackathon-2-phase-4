---
id: 5
title: Fix Auth Architecture
stage: implement
date: 2026-01-06
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 1-todo-phase-2
branch: 1-todo-phase-2
user: developer
command: general
labels: [fix, auth, nextjs]
links:
  spec: specs/1-todo-phase-2/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/lib/auth.ts
  - frontend/src/app/api/auth/[...all]/route.ts
  - frontend/src/lib/auth-client.ts
  - frontend/package.json
  - frontend/.env.local
tests:
  - N/A
---

## Prompt

TypeError: Failed to fetch...

## Response snapshot

Diagnosed incorrect architecture: User tried to hit FastAPI for Better Auth endpoints which were not implemented.
Corrected architecture:
1. Implemented Better Auth Server in Next.js (frontend/src/lib/auth.ts, route.ts).
2. Added pg dependency.
3. Updated auth-client to point to Next.js (localhost:3000).
4. Added DATABASE_URL to frontend env.

## Outcome

- ✅ Impact: Enabling Auth flow to work via Next.js server.
- 🧪 Tests: N/A.
- 📁 Files: Modified frontend config and added auth routes.
- 🔁 Next prompts: User needs to run npm install again.
- 🧠 Reflection: The original plan assumed a "headless" auth verification in Python but missed the "creation" part which Better Auth handles best in Node.js.

## Evaluation notes (flywheel)

- Failure modes observed: Architecture mismatch (TS client -> Python backend for library specific endpoints).
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
