---
id: 6
title: Troubleshooting Missing pg Module
stage: refactor
date: 2026-01-06
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 1-todo-phase-2
branch: 1-todo-phase-2
user: developer
command: general
labels: [fix, dependencies, win32]
links:
  spec: specs/1-todo-phase-2/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - frontend/package.json
tests:
  - N/A
---

## Prompt

Module not found: Can't resolve 'pg'

## Response snapshot

Instructed user to manually run `npm install pg @types/pg` in the frontend directory because local PSSecurityException prevented the agent from executing npm.

## Outcome

- ✅ Impact: Providing path to resolve missing dependency.
- 🧪 Tests: N/A.
- 📁 Files: N/A.
- 🔁 Next prompts: User to verify installation.
- 🧠 Reflection: Windows execution policies frequently block npm scripts via powershell tools; manual intervention is required.

## Evaluation notes (flywheel)

- Failure modes observed: UnauthorizedAccess (PSSecurityException) for npm.ps1.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Suggest `npm.cmd` instead of `npm` if attempting shell execution on win32.
