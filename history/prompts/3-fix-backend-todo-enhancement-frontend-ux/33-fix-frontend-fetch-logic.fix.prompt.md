---
id: 33
title: Fix Frontend Fetch Logic
stage: fix
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 3-fix-backend-todo-enhancement-frontend-ux
branch: 3-fix-backend-todo-enhancement-frontend-ux
user: developer
command: general
labels: [fix, frontend, react, hooks, clerk]
links:
  spec: specs/3-fix-backend-todo-enhancement-frontend-ux/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/components/todo-list.tsx
tests:
  - N/A
---

## Prompt

"abhi bhi task show nhi horahay add huay way login k baad khud say" (Still not showing tasks automatically after login).

## Response snapshot

Modified `todo-list.tsx` to depend on `useAuth()` state (`isLoaded`, `userId`).
The previous `useEffect` ran only once on mount (`[]`). If Clerk hadn't loaded the user yet, the API call might have fired without a token or with a stale state, returning 401 or empty list, and then never retried.
New logic: `useEffect` depends on `[isLoaded, userId]`. It waits until Clerk says "User is loaded and here is the ID" before fetching.

## Outcome

- ✅ Impact: Ensures API call happens *after* Auth is ready.
- 🧪 Tests: N/A.
- 📁 Files: Modified todo-list.tsx.
- 🔁 Next prompts: User verification.
- 🧠 Reflection: Classic "useEffect on mount" trap with async auth providers.

## Evaluation notes (flywheel)

- Failure modes observed: Race condition (API call vs Auth load).
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
