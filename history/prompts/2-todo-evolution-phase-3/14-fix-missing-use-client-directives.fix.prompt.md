---
id: 14
title: Fix Missing 'use client' Directives
stage: fix
date: 2026-01-06
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 2-todo-evolution-phase-3
branch: 2-todo-evolution-phase-3
user: developer
command: general
labels: [fix, nextjs, react, client-component]
links:
  spec: specs/2-todo-evolution-phase-3/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/components/todo-list.tsx
  - frontend/src/components/todo-item.tsx
  - frontend/src/components/todo-form.tsx
tests:
  - N/A
---

## Prompt

Error: You're importing a component that needs useEffect. It only works in a Client Component...

## Response snapshot

Added `"use client";` directive to `todo-list.tsx`, `todo-item.tsx`, and `todo-form.tsx` as they all use React hooks (`useState`, `useEffect`) and are used within the dashboard page.

## Outcome

- ✅ Impact: Resolved Next.js Server Component error.
- 🧪 Tests: N/A.
- 📁 Files: Modified 3 component files.
- 🔁 Next prompts: User verify fix.
- 🧠 Reflection: Classic Next.js App Router oversight. Any component with interactivity or hooks needs this directive.

## Evaluation notes (flywheel)

- Failure modes observed: Missing "use client".
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
