---
id: 20
title: Fix Pydantic Validation on POST
stage: fix
date: 2026-01-06
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 2-todo-evolution-phase-3
branch: 2-todo-evolution-phase-3
user: developer
command: general
labels: [fix, backend, pydantic, validation]
links:
  spec: specs/2-todo-evolution-phase-3/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/app/api/endpoints/todos.py
tests:
  - N/A
---

## Prompt

POST /todos fails with `pydantic_core.ValidationError: 1 validation error for Todo user_id - Field required`

## Response snapshot

The error occurs because `Todo.from_orm(todo)` (in Pydantic v2 `model_validate`) validates the model *immediately*, and since `user_id` is required on the `Todo` table but missing from `TodoCreate`, it fails before we can manually assign it.

**Fix**: Use `Todo.model_validate(todo, update={"user_id": user_id})` to inject the field *during* creation. Also updated deprecated `from_orm` -> `model_validate` and `dict` -> `model_dump` for full Pydantic v2 compatibility.

## Outcome

- ✅ Impact: Fixed POST validation error.
- 🧪 Tests: N/A.
- 📁 Files: Modified endpoints/todos.py.
- 🔁 Next prompts: User to test POST.
- 🧠 Reflection: Pydantic v2 is stricter about initialization. `from_orm` is also deprecated.

## Evaluation notes (flywheel)

- Failure modes observed: ValidationError on model creation.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
